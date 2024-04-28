from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.core.mail import send_mail


@receiver(post_save, sender=User)
def user_post_save(sender, instance, created, **kwargs):
    if created:
        send_mail(
            'Confirm Your Registration at Videoflix!',
            f"""
Your registration at VideoFlix was successful.
To activate your account and gain access, please click on the following link:

https://videoflix.marcelherzog.net/register-confirmation/{instance.pk}

Please note that this link is valid only once and must be activated within 24 hours of receiving this email.

The VideoFlix Team
            """,
            'info@marcelherzog.net',
            [instance.email],
            fail_silently=False,
        )


def reset_password_link(user, token):
    send_mail(
        'Password Reset Request Received',
        f"""
Dear {user.username},

A request to reset your password has been received. If you initiated this password reset, please follow the instructions below to reset your password:

1. Click on the following link to reset your password:
https://videoflix.marcelherzog.net/reset-password/{token.token}

2. If you did not request a password reset, please ignore this email. Your account remains secure.

If you have any questions or concerns, please contact our support team immediately at info@marcelherzog.net.

The Videoflix Team
        """,
        'info@marcelherzog.net',
        [user.email],
        fail_silently=False,
    )
