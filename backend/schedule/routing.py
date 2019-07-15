from django.conf.urls import url
from django.urls import path
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from schedule.consumers import CommentConsumer

websocket_urlpatterns = [
	path('ws/schedule/<room_name>/', CommentConsumer),
]
