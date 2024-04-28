from django.db import models
from datetime import date


class Video(models.Model):
    title = models.CharField(max_length=50, default='')
    description = models.CharField(max_length=500, default='')
    createdTime = models.DateField(default=date.today)
    cover_file = models.FileField(upload_to='covers', blank=True, null=True)
    video_file = models.FileField(upload_to='videos', blank=True, null=True)
    video_file_720p = models.FileField(
        upload_to='videos', blank=True, null=True)
    video_file_480p = models.FileField(
        upload_to='videos', blank=True, null=True)

    def __str__(self):
        return self.title
