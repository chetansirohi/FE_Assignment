# from rest_framework.permissions import BasePermission

# class IsAdminUser(BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_admin


from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_admin

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.assigned_to == request.user or request.user.is_admin