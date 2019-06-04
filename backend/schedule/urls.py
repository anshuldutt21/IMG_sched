
from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
        path('', views.home, name="index"),
        path('login/',auth_views.LoginView.as_view(template_name='schedule/login.html')),
        path('register/',views.register, name="register"),
        path('profile/',views.profile,name="profile"),
        path('auth/',include('social_django.urls', namespace='social')),
]

