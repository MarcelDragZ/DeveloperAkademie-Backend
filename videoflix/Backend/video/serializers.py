from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Video


class VideoSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'createdTime',
                  'cover_file', 'video_file', 'video_file_720p', 'video_file_480p']
