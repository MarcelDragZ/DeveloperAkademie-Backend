from rest_framework.test import APITestCase
from rest_framework import status
from .models import Video


class VideoViewSetTestCase(APITestCase):
    def setUp(self):
        # Erstelle ein Video-Objekt für den Test
        self.video_data = {
            'title': 'Testvideo',
            'description': 'Dies ist ein Testvideo',
            'cover_file': 'cover.jpg',
            'video_file': 'video.mp4'
        }
        self.video = Video.objects.create(**self.video_data)

    def test_create_video(self):
        url = '/videoflix/videos/'
        response = self.client.post(
            url, data=self.video_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_video(self):
        url = f'/videoflix/videos/{self.video.id}/'
        updated_data = {
            'title': 'Neuer Titel',
            'description': 'Neue Beschreibung'
        }
        response = self.client.patch(url, data=updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], updated_data['title'])
        self.assertEqual(
            response.data['description'], updated_data['description'])

    def test_delete_video(self):
        url = f'/videoflix/videos/{self.video.id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Video.objects.filter(pk=self.video.id).exists())
