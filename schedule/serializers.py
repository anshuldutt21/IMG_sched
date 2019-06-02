from rest_framework import serializers
from django.contrib.auth.models import User
#from django.forms.exceptions import ValidationError
from rest_framework.serializers import ValidationError
from schedule.models import UserProfile
from django.contrib.auth import get_user_model
# from schedule.serializers import UserProfileSerializer


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model=User
		fields = ('username')



class UserProfileSerializer(serializers.ModelSerializer):
	profile = UserSerializer()
    #follows = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model = UserProfile
		fields = ('user_year','user_role')



	# def create(self,validated_data):
	# 	profile_data = validated_data.pop('profile')
	# 	user = User.objects.create(**validated_data)
	# 	UserProfile.objects.create(username=user, **profile_data)
	# 	return user