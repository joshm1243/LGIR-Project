from django.urls import path
from application.consumers import ApplicationConsumer

from application.dashboardConsumer import DashboardConsumer

ws_urlpatterns = [
    path('application/<app_code>/workspace/', ApplicationConsumer.as_asgi()),
    path('dashboard/', DashboardConsumer.as_asgi())
]