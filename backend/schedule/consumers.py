
from channels.generic.websocket import AsyncWebsocketConsumer
from schedule.models import Comment,UserProfile,Meeting
from django.contrib.auth.models import User
import json

class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        name = self.scope['url_route']['kwargs']['name']
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
        comment = Comment(comment_post="",comment_user="")
        meeting = Meeting.objects.get(id=self.room_name)
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
       
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'comment_message',
                'message': message,
            }
        )
        name = self.scope['url_route']['kwargs']['name']
        comment.comment_post=message
        comment.comment_user=name
        comment.comment_id=meeting
        comment.save()
    # Receive message from room group
    async def comment_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
        }))

