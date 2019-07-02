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
		# profile_data = validated_data.pop('profile')
		password=validated_data.pop('password')
		user=User(**validated_data)
		user.set_password(password)
		user.save()
		UserProfile.objects.update_or_create(user=user)
		return user
		# user = UserSerializer.create(UserSerializer(), validated_data=user_data)
		# student, created = UserProfile.objects.update_or_create(user=user,user_year=validated_data.pop('user_year'),user_role=validated_data.pop('user_role'))
		# return student
		# password = validated_data.pop('password', None)
		# instance = self.Meta.model(**validated_data)
		# if password is not None:
		# 	instance.set_password(password)
		# instance.save()
		# UserProfile.objects.update_or_create(user=instance,user_year=2,user_role=1)
		# return instance
		# user_data = validated_data.pop('user')
		# user = UserSerializer.create(UserSerializer(), validated_data=user_data)
		# return student

	class Meta:
		model = User
		fields = ('token', 'username','password','is_staff')
		# model = UserProfile
		# fields = ('token','user','user_role','user_year')
		extra_kwargs = {'password': {'write_only':True}}

class MeetingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Meeting
		fields = ('id','purpose','detail','datetime','venue','meeting_choice','host','invitees')
		
class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = ('comment_id','comment_post','datetime','comment_user')