from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django import forms
from django.dispatch import receiver
# from django.forms import widget
# from django.forms import *
# Create your models here.

USER_ROLE = (
        (1, 'NORMAL USER'),
        (2, 'ADMIN')
)
MEETING_CHOICES = (
        (1,'Public'),
        (2,'Private') 
)
class UserProfile(models.Model):
	user = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
	user_role = models.IntegerField(choices = USER_ROLE,null=True,blank=True)
	user_year = models.IntegerField(null=True,blank=True)
	def __str__(self):
		return '%s' % (self.user)

def create_profile(sender,**kwargs):
	# create_user(request)
	if kwargs['created']:
		user_profile = UserProfile.objects.create(username=kwargs.get('instance'))		
		user_profile.save()

# post_save.connect(create_profile,sender=User)
class Meeting(models.Model):
	purpose=models.CharField(max_length=100,null=True)
	datetime=models.DateTimeField(auto_now=False,auto_now_add=False)
	venue=models.CharField(max_length=30,default="IMG Lab")
	meeting_choice=models.IntegerField(choices=MEETING_CHOICES)
	host=models.ForeignKey(UserProfile,related_name='host',on_delete=models.CASCADE)
	invitees=models.ManyToManyField(UserProfile,related_name='matchinvitees')
	def __str__(self):
		return self.purpose