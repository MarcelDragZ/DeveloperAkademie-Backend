

from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APITestCase
from .models import PasswordResetToken
from django.utils import timezone


class RegisterViewTest(APITestCase):
    def test_register_user_successfully(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password1': 'testpass123',
            'password2': 'testpass123'
        }

        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data, {"message": "User successfully registered"})


class RegisterConfirmationViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser', email='test@example.com', password='testpass123', is_active=False)

    def test_activate_user_successfully(self):
        url = reverse('register-confirmation', args=[self.user.pk])

        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data, {"message": "User successfully activated"})

        self.user.refresh_from_db()
        self.assertTrue(self.user.is_active)

    def test_activate_nonexistent_user(self):
        nonexistent_user_id = self.user.pk + 1
        url = reverse('register-confirmation', args=[nonexistent_user_id])

        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"error": "User not found"})

        self.user.refresh_from_db()
        self.assertFalse(self.user.is_active)


class LoginTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('test_user', password='test_user')

    def test_login(self):
        data = {
            'username': 'test_user',
            'password': 'test_user'
        }
        response = self.client.post('/videoflix/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user_id', response.data)
        self.assertIn('email', response.data)


class ResetPasswordViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='testuser', email='test@example.com', password='testpass123')

    def test_reset_password_successfully(self):

        email = 'test@example.com'
        url = reverse('reset-password')
        data = {'email': email}

        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data, {"message": "Password reset E-Mail has been sent!"})

        self.assertEqual(PasswordResetToken.objects.filter(
            user=self.user).count(), 1)

        token = PasswordResetToken.objects.get(user=self.user).token

        url = reverse('reset-password', args=[token])
        new_password = 'newpassword'
        data = {'password': new_password}

        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data, {"message": "Password successfully changed"})

        login_url = reverse('login')
        login_data = {'username': self.user.username, 'password': new_password}
        login_response = self.client.post(login_url, login_data)
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
