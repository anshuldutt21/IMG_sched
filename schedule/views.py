from django.shortcuts import render,redirect
from django.http import HttpResponse
from schedule.forms import RegistrationForm
# Create your views here.
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