# Generated by Django 5.0.2 on 2024-03-13 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0003_alter_video_video_file_720p'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='video_file_720p',
            field=models.FileField(blank=True, null=True, upload_to='videos'),
        ),
    ]
