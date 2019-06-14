from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.http import Http404
from schedule.forms import UserForm,UserProfileForm
from schedule.models import UserProfile,Meeting,Comment
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import viewsets, mixins, permissions
from rest_framework import status, viewsets,generics
from schedule.serializers import MeetingSerializer,CommentSerializer
from rest_framework.response import Response
from schedule.permissions import IsOwnerOrAdmin
from django.utils.safestring import mark_safe
import json

def home(request):
    return render(request, 'schedule/home.html')
def register(request):
	registered =False
	if request.method=='POST':
		user_form = UserForm(data = request.POST)
		profile_form = UserProfileForm(data=request.POST)
		if  profile_form.is_valid():
			user=user_form.save()
			user.set_password(user.password)
			user.save()
			profile=profile_form.save(commit=False)
			profile.user=user
			profile.save()
			user.save()
			registered=True
			return redirect('/schedule/')
		else:
			return HttpResponse('you have entered wrong info')
	else:
		user_form=UserForm()
		profile_form=UserProfileForm()

		args = {'user_form':user_form,'profile_form':profile_form}
		return render(request, 'schedule/register.html', args)
@login_required
def profile(request):
	meeting = Meeting.objects.all()
	args = {'user':request.user,'meeting':meeting}
	return render(request,'schedule/profile.html',args)

class MeetingView(generics.ListCreateAPIView):
	permission_classes = [IsOwnerOrAdmin]
	queryset=Meeting.objects.all()
	serializer_class=MeetingSerializer

	def get(self,request, format=None):
		meetings=Meeting.objects.all().filter(invitees=request.user.id)
		serializer=MeetingSerializer(meetings, many=True)
		return Response(serializer.data)

	def post(self,request, format=None):
		serializer=MeetingSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)	
		
class MeetingDetailView(APIView):
	permission_classes = [IsOwnerOrAdmin]
	def get_object(self,pk):
		return Meeting.objects.get(pk=pk)
	def get(self, request, pk, format=None):
		meeting=self.get_object(pk)
		serializer=MeetingSerializer(meeting)
		return Response(serializer.data)

	def put(self,request,pk,format=None):
		meeting=self.get_object(pk)
		serializer=MeetingSerializer(meeting)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	def delete(self,request,format=None):
		meeting=self.get_object(pk)
		meeting.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

def room(request, room_name):
	return render(request, 'schedule/room.html', {
		'room_name_json' : mark_safe(json.dumps(room_name)),
		})
class CommentView(APIView):
	def get_object(self,fk):
		return Comment.objects.get(comment_id=fk)
	def get(self,request,fk,format=None):
		comment=self.get_object(fk)
		serializer=CommentSerializer(comment)
		return Response(serializer.data)

	def delete(self,request,fk,format=None):
		comment=self.get_object(fk)
		comment.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

