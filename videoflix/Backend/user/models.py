
from django.db import models
from django.contrib.auth.models import User
import uuid
from uuid import uuid4
from django.utils import timezone
from datetime import timedelta


def default_expires_at():
    return timezone.now() + timedelta(hours=24)


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=default_expires_at)

    def is_valid(self):
        return timezone.now() < self.expires_at
