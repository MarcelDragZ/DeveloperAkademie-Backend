from django.contrib.auth.models import User
from rest_framework import serializers
from django.utils import timezone
from .models import PasswordResetToken


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=20)
    email = serializers.EmailField()
    password1 = serializers.CharField(max_length=50)
    password2 = serializers.CharField(max_length=50)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError(
                {"username": "Ein Benutzer mit diesem Username existiert bereits."})
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1'],
            is_active=False
        )
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Ein Benutzer mit dieser E-Mail existiert nicht.")
        return value


class PasswordChangeSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField()

    def validate_token(self, value):
        try:
            token_obj = PasswordResetToken.objects.get(
                token=value, expires_at__gte=timezone.now())
        except PasswordResetToken.DoesNotExist:
            raise serializers.ValidationError(
                "Ungültiges oder abgelaufenes Token.")
        return value

    def validate_new_password(self, value):
        return value
