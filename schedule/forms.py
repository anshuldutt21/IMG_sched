from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
# from schedule.models import UserProfile

USER_ROLE = (
        (1, 'NORMAL USER'),
        (2, 'ADMIN')
)	

class RegistrationForm(UserCreationForm):
	user_role = forms.ChoiceField(label='userrole',choices = USER_ROLE)
	user_year = forms.IntegerField(label='useryear')


	class Meta:
		model = User
		fields = ('username','user_year','user_role','password1','password2')
	def save(self,commit=True):
		user = super(RegistrationForm,self).save(commit=False)
		user.user_role = self.cleaned_data['user_role']
		user.user_year = self.cleaned_data['user_year']

		if commit:
			user.save()

		return user
