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
	class Meta:
		model=UserProfile
		fields=('user_role','user_year')

class UserSerializerWithToken(serializers.ModelSerializer):
	token = serializers.SerializerMethodField()

	def get_token(self, obj):
		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
		payload = jwt_payload_handler(obj)
		token = jwt_encode_handler(payload)
		return token

	def create(self, validated_data):
		password=validated_data.pop('password')
		user=User(**validated_data)
		user.set_password(password)
		user.save()
		UserProfile.objects.update_or_create(user=user)
		return user

	class Meta:
		model = User
		fields = ('id','token', 'username','password','is_staff')
		extra_kwargs = {'password': {'write_only':True}}

class MeetingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Meeting
		fields = ('pk','purpose','detail','datetime','venue','meeting_choice','host','invitees')
		
class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = ('comment_id','comment_post','datetime','comment_user')