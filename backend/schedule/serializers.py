from rest_framework import serializers
from schedule.models import UserProfile,Meeting,Comment,User
from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model=User
		fields=('username','password')
class UserProfileSerializer(serializers.ModelSerializer):
	user=UserSerializer(required=True)
	
	class Meta:
		model=UserProfile
		fields = ('user','user_role','user_year')
		extra_kwargs = {'password': {'write_only':True}}

	def create(self,validated_data):
		user_data = validated_data.pop('user')
		user = UserSerializer.create(UserSerializer(), validated_data=user_data)
		student, created = UserProfile.objects.update_or_create(user=user,user_year=validated_data.pop('user_year'),user_role=validated_data.pop('user_role'))
		return student

class MeetingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Meeting
		fields = ('id','purpose','detail','datetime','venue','meeting_choice','host','invitees')
		
class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = ('comment_id','comment_post','datetime','comment_user')