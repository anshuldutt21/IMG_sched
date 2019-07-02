from __future__ import print_function
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.http import Http404
from rest_framework.decorators import api_view
from schedule.forms import UserForm,UserProfileForm
from schedule.models import UserProfile,Meeting,Comment
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import viewsets, mixins, permissions
from rest_framework import status, viewsets,generics
from schedule.serializers import UserSerializer,UserProfileSerializer,MeetingSerializer,CommentSerializer,UserSerializerWithToken
from rest_framework.response import Response
from schedule.permissions import IsOwnerOrAdmin,IsOwner
from django.utils.safestring import mark_safe
import json
import os
from datetime import timedelta
import datetime
import pytz
import datetime
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import httplib2
from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from django.contrib.auth import get_user_model
User = get_user_model()

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

@api_view(['GET'])
def current_user(request):
	serializer=UserSerializer(request.user)
	return Response(serializer.data)


	
class UserViewSet(generics.ListCreateAPIView):
	permission_classes = [permissions.AllowAny]
	queryset=User.objects.all()
	serializer_class=UserSerializerWithToken

class UserDetailView(APIView):
	permission_classes = [IsOwner]
	def get_object(self,pk):
		return UserProfile.objects.get(pk=pk)
	def get(self, request, pk, format=None):
		user=self.get_object(pk)
		serializer=UserProfileSerializer(user)
		return Response(serializer.data)

	def put(self,request,pk,format=None):
		user=self.get_object(pk)
		serializer=UserProfileSerializer(user)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	def delete(self,request,format=None):
		user=self.get_object(pk)
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


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



def build_service(request):

    CLIENT_SECRET_FILE = 'credentials.json'

    SCOPES = 'https://www.googleapis.com/auth/calendar'
    scopes = [SCOPES]
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server()
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)
    return service
    
@login_required
def create_event(request):
    service = build_service(request)
    meeting=Meeting.objects.latest('id')
    # meeting=Meeting.objects.get(id=4)
    event = service.events().insert(calendarId='primary', body={
        'summary': meeting.purpose,
        'description' : meeting.detail,
        'start': {'dateTime': meeting.datetime.isoformat()},
        'end': {'dateTime': meeting.datetime.isoformat()},
    }).execute()

    return HttpResponse("meeting was added")

