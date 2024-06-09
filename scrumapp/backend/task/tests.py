from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer
from .models import Task
from .serializers import TaskSerializer

        ######################### Serializer #############################

class UserRegistrationSerializerTest(TestCase):
    def test_valid_registration(self):
        valid_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword123',
            'password2': 'testpassword123',
        }
        serializer = UserRegistrationSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())

        user = serializer.save()
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')

    def test_invalid_registration_password_mismatch(self):
        invalid_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword123',
            'password2': 'wrongpassword',
        }
        serializer = UserRegistrationSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

class TaskSerializerTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.force_authenticate(user=self.user)

        self.task = Task.objects.create(
            title='Test Task',
            description='Test Description',
            priority=Task.PRIORITY_MEDIUM,
            status=Task.STATUS_OPEN,
            creatorId=self.user
        )

    def test_serialize_task(self):
        serializer = TaskSerializer(instance=self.task)
        data = serializer.data

        self.assertEqual(data['title'], 'Test Task')
        self.assertEqual(data['description'], 'Test Description')
        self.assertEqual(data['priority'], Task.PRIORITY_MEDIUM)
        self.assertEqual(data['status'], Task.STATUS_OPEN)
        self.assertEqual(data['creatorId'], self.user.id)

        # Testen, ob die Felder vorhanden sind
        self.assertIn('title', data)
        self.assertIn('description', data)
        self.assertIn('priority', data)
        self.assertIn('status', data)
        self.assertIn('creatorId', data)