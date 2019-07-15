
from channels.generic.websocket import AsyncWebsocketConsumer
from schedule.models import Comment,UserProfile,Meeting
from django.contrib.auth.models import User
from channels.auth import login
import json
SECRET_KEY = '!1s%h1e8hma573fprdq3)kuv+-u5&bc#u4ejrm5h-o@@otseo!'

class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user=self.scope['user']
        print(self.user)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'comment_%s' % self.room_name
        comment = Comment(comment_post="",comment_user="")

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket

    async def receive(self,text_data):
        self.user=self.scope["user"]
        comment = Comment(comment_post="",comment_user="")
        meeting = Meeting.objects.get(id=self.room_name)
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user = text_data_json['user']
        print(user)
       
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'comment_message',
                'message': message,
                'user': user
            }
        )
        print(user)
        comment.comment_post=message
        comment.comment_user=user
        comment.comment_id=meeting
        comment.save()
    # Receive message from room group
    async def comment_message(self, event):
        message = event['message']
        user=event['user']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'user': user
        }))

