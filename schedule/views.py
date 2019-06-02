from django.shortcuts import render,redirect
from django.http import HttpResponse
from schedule.forms import RegistrationForm
from schedule.models import UserProfile
from django.contrib.auth.models import User
from schedule.serializers import  UserProfileSerializer,UserSerializer
# from schedule.permissions import (IsOwnerOrReadOnly, IsAdminUserOrReadOnly, IsSameUserAllowEditionOrReadOnly)
from rest_framework import viewsets, mixins, permissions

def home(request):
    return render(request, 'schedule/home.html')
def register(request):
	if request.method=='POST':
		form = RegistrationForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect('/schedule')
		else:
			return HttpResponse('you have entered wrong info')
	else:
		form=RegistrationForm()

		args = {'form':form}
		return render(request, 'schedule/register.html', args)

