from django.urls import path
from .consumers import ApplicationConsumer
from .settingsconsumer import SettingsConsumer

ws_urlpatterns = [
    path('application/<app_code>/workspace/', ApplicationConsumer.as_asgi()),
    path('application/<app_code>/settings/', ApplicationConsumer.as_asgi()),
]
