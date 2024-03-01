from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):
    message = "You are authenticated but you are not the owner"

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.is_staff:
            return True
        return bool(request.user == obj.user)
