from rest_framework import serializers
from schedule.models import UserProfile,Meeting,Comment

class MeetingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Meeting
		fields = ('id','purpose','datetime','venue','meeting_choice','host','invitees')
		
class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = ('comment_id','comment_post','datetime','comment_user')