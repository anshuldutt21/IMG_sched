from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from schedule.models import UserProfile

USER_ROLE = (
        (1, 'NORMAL USER'),
        (2, 'ADMIN')
)	


class UserForm(UserCreationForm):
	class Meta():
		model = User
		fields = ('username','password1','password2')

class UserProfileForm(forms.ModelForm):
	class Meta():
		model = UserProfile
		fields = ('user_role','user_year')