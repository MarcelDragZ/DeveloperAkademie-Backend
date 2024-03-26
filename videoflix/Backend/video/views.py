from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from django.core import serializers
from rest_framework.authentication import TokenAuthentication
from .models import Video
from .serializers import VideoSerializer
import json


class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Video.objects.all().order_by('-createdTime')
    serializer_class = VideoSerializer
    # permissions.IsAuthenticated # user must be logged in
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request):
        video = Video.objects.create(
            title=request.data.get('title', ''),
            description=request.data.get('description', ''),
            cover_file=request.data.get('cover_file', ''),
            video_file=request.data.get('video_file', ''))
        serialized_obj = serializers.serialize('json', [video, ])
        return HttpResponse(serialized_obj, content_type='application/json')

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # partial=True erlaubt teilweise Updates
        serializer = VideoSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(json.dumps(serializer.data), content_type='application/json', status=200)

        return HttpResponse(status=400)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return HttpResponse(status=204)
