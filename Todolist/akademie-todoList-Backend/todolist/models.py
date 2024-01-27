from django.db import models
from django.conf import settings
import datetime

class TodoItem(models.Model):
    title = models.CharField(max_length=100)
    detail = models.TextField()
    createdTime = models.DateField(default=datetime.date.today)
    checked = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'({self.id}) {self.title}'