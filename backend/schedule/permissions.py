from rest_framework import permissions
from django.contrib import admin

class IsOwnerOrAdmin(permissions.BasePermission):
	def has_object_permission(self,request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return ((request.user.is_staff) or str(obj.host)==str(request.user)) 

class IsOwner(permissions.BasePermission):
	def has_object_permission(self,request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return str(obj.host)==str(request.user) 