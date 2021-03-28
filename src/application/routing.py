from django.urls import path
from .consumers import ApplicationConsumer

ws_urlpatterns = [
    path('application/<app_code>/workspace/', ApplicationConsumer.as_asgi()),
]
