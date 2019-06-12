from rest_framework.routers import DefaultRouter
from .views import MeetingView,MeetingDetailView
from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views

# router = DefaultRouter()
# router.register(r'meetings',views.MeetingView)

urlpatterns = [
        path('', views.home, name="index"),
        path('login/',auth_views.LoginView.as_view(template_name='schedule/login.html')),
        path('register/',views.register, name="register"),
        path('profile/',views.profile,name="profile"),
        path('auth/',include('social_django.urls', namespace='social')),
        path('test/', views.MeetingView.as_view()),
        path('test/<int:pk>',views.MeetingDetailView.as_view())
        # path('',include(router.urls)),

    
]

