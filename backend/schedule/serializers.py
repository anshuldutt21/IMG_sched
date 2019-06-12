from rest_framework import serializers
from schedule.models import UserProfile,Meeting

class MeetingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Meeting
		fields = ('id','purpose','datetime','venue','meeting_choice','host','invitees')
		