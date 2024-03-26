"""
URL configuration for videoflix project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework import routers
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from user.views import registerView, registerConfirmationView, loginView, resetPasswordView
from video.views import VideoViewSet

router = routers.DefaultRouter()
router.register(r'videos', VideoViewSet)

urlpatterns = [
    path('videoflix/', include([
        path('', include(router.urls)),
        path('admin/', admin.site.urls),
        path('django-rq/', include('django_rq.urls')),
        path('register/', registerView.as_view(), name='register'),
        path('register-confirmation/<int:user_id>/',
             registerConfirmationView.as_view(), name='register-confirmation'),
        path('login/', loginView.as_view(), name='login'),
        path('reset-password/', resetPasswordView.as_view(), name='reset-password'),
        path('reset-password/<str:token>/',
             resetPasswordView.as_view(), name='reset-password'),
    ])),
] + staticfiles_urlpatterns() + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
