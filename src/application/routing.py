from django.urls import path
from application.consumers import ApplicationConsumer

ws_urlpatterns = [
    path('application/<app_code>/workspace/', ApplicationConsumer.as_asgi()),
]