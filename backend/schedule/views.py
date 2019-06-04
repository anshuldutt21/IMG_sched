from django.shortcuts import render,redirect
from django.http import HttpResponse
from schedule.forms import UserForm,UserProfileForm
from schedule.models import UserProfile
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from rest_framework import viewsets, mixins, permissions

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
	args = {'user':request.user}
	return render(request,'schedule/profile.html',args)
