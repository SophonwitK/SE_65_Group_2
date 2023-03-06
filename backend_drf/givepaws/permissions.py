from rest_framework import permissions

class isEmployee(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_employee)