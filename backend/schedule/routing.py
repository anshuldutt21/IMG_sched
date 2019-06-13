from django.conf.urls import url
from django.urls import path
from schedule.consumers import CommentConsumer

websocket_urlpatterns = [
	path('ws/schedule/<room_name>/<name>/', CommentConsumer),
]