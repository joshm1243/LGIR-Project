"""
ASGI config for lgirproject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
from channels.routing import URLRouter
from application.routing import ws_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lgirproject.settings')

#ProtocolTypeRouter checks the type of protocol being used 
application = ProtocolTypeRouter({
    'http' : get_asgi_application(), #HTTP protocol
    'websocket' : AuthMiddlewareStack( #WEBSOCKET protocol
        URLRouter(
            ws_urlpatterns
        )
    ),
})


#