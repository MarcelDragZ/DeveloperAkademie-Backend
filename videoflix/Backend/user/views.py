from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.utils import timezone
from django.contrib.auth.hashers import make_password

from .serializers import RegisterSerializer
from .signals import reset_password_link
from .models import PasswordResetToken


class registerView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User successfully registered"}, status=200)
        return Response(serializer.errors, status=400)


class registerConfirmationView(APIView):
    def put(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            user.is_active = True
            user.save()
            return Response({"message": "User successfully activated"}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)


class loginView(ObtainAuthToken):
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


class resetPasswordView(APIView):
    def put(self, request, token):
        try:
            password_reset_token = PasswordResetToken.objects.get(token=token)
        except PasswordResetToken.DoesNotExist:
            return Response({"error": "Invalid Token"}, status=404)

        if password_reset_token.is_valid():
            user = password_reset_token.user
            new_password = request.data.get('password')
            user.set_password(new_password)
            user.save()
            password_reset_token.delete()
            return Response({"message": "Password successfully changed"}, status=200)
        else:
            return Response({"error": "Token is invalid or has expired"}, status=400)

    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            PasswordResetToken.objects.filter(user=user).delete()
            token = PasswordResetToken.objects.create(user=user)
            reset_password_link(user, token)
            return Response({"message": "Password reset E-Mail has been sent!"}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
