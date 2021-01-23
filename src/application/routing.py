from django.urls import path
from .consumers import ApplicationConsumer

ws_urlpatterns = [
    path("dashboard/", ApplicationConsumer.as_asgi()),
]
#