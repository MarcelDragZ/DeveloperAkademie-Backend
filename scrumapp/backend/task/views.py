from telnetlib import STATUS
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.authtoken.models import Token
from django.core import serializers
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer, UserRegistrationSerializer, UserSerializer

import json


class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Task.objects.all().order_by('-createdTime')
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated] # permissions.IsAuthenticated # user must be logged in
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        task = Task.objects.create(
            title = request.data.get('title', ''),
            description = request.data.get('description', ''),
            priority = request.data.get('priority', Task.PRIORITY_MEDIUM),
            status = request.data.get('status', Task.STATUS_OPEN),
            creatorId = request.user)
        serialized_obj = serializers.serialize('json', [task, ])
        return HttpResponse(serialized_obj, content_type = 'application/json')
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = TaskSerializer(instance, data=request.data, partial=True)  # partial=True erlaubt teilweise Updates
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(json.dumps(serializer.data), content_type='application/json', status=200)
        
        return HttpResponse(status=400)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return HttpResponse(status=204)
    

class UserView(ObtainAuthToken):
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return HttpResponse(json.dumps(serializer.data), status=200)
    
class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        username = request.user.username
        return Response({"username": username})

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
    
class RegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Benutzer erfolgreich registriert."}, status=201)
        return Response(serializer.errors, status=400)