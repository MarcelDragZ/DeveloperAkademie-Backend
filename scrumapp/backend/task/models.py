from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from datetime import date 
import datetime 

class Task(models.Model):
    PRIORITY_HIGH = 'high'
    PRIORITY_MEDIUM = 'medium'
    PRIORITY_LOW = 'low'
    
    PRIORITY_CHOICES = [
        (PRIORITY_HIGH, 'high'),
        (PRIORITY_MEDIUM, 'medium'),
        (PRIORITY_LOW, 'low'),
    ]

    STATUS_OPEN = 'open'
    STATUS_PROGRESS = 'progress'
    STATUS_CLOSED = 'closed'
    
    STATUS_CHOICES = [
        (STATUS_OPEN, 'open'),
        (STATUS_PROGRESS, 'progress'),
        (STATUS_CLOSED, 'closed'),
    ]

    title = models.CharField(max_length = 30)
    description = models.CharField(max_length = 150)
    priority = models.CharField(
        max_length=15, 
        choices=PRIORITY_CHOICES,
        default=PRIORITY_MEDIUM,
    )
    status = models.CharField(
        max_length=15, 
        choices=STATUS_CHOICES,
        default=STATUS_OPEN,
    )
    createdTime = models.DateField(default = datetime.date.today)
    creatorId = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        default = None
    )

    def timePassed(self):
        today = date.today()
        delta = today - self.createdTime
        
        return delta.days
    

    def __str__(self):
        return f'({self.id}) {self.title}'
