from rest_framework.routers import DefaultRouter
from .views import current_user,MeetingView,MeetingDetailView,CommentView,UserViewSet,UserDetailView,GoogleLogin
from .views import build_service,create_event
from django.urls import path,include
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib.auth import views as auth_views


urlpatterns = [
        path('token-auth/', obtain_jwt_token),
        path('', views.home, name="index"),
        path('current_user/',current_user),
        path('login/',auth_views.LoginView.as_view(template_name='schedule/login.html')),
        path('register/',views.register, name="register"),
        path('userlist/',views.UserViewSet.as_view()),
        path('userlist/<int:pk>',views.UserDetailView.as_view()),
        path('rest-auth/',include('rest_auth.urls')),
        path('profile/',views.profile,name="profile"),
        path('account/',include('allauth.urls')),
        # path('auth/',include('social_django.urls', namespace='social')),
        path('test/', views.MeetingView.as_view()),
        path('test/<int:pk>',views.MeetingDetailView.as_view()),
        path('<room_name>/', views.room, name='room'),
        path('comment/<int:fk>',views.CommentView.as_view()),
        path('rest-auth/google/', GoogleLogin.as_view()),
        path('calendar/cal/',views.create_event,name="calendar"),
        path('auth/', include('rest_framework_social_oauth2.urls')),

    
]

