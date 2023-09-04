from rest_framework.permissions import BasePermission, DjangoModelPermissions


class GroupPermissions(BasePermission):
    def has_permission(self, request, view):
        allowed_groups = ['Admin', 'Project Manager', 'Developer']
        if request.user.groups.filter(name__in=allowed_groups).exists():
            return DjangoModelPermissions().has_permission(request, view)
        return False
