# Generated by Django 4.2.4 on 2023-08-28 13:05

from django.db import migrations
from django.contrib.auth.models import Group, Permission


def create_groups(apps, schema_editor):
    GROUP_CHOICES = {
        "Admin": [Permission.objects.all()],
        "Project Manager": ["add_project", "create_project", "delete_project", "create_task", "change_task",
                            "delete_task"],
        "Developer": ["create_task", "change_task", "delete_task"]
    }

    for group_name, permissions in GROUP_CHOICES:
        group, created = Group.objects.get_or_create(name=group_name)

        for permission in permissions:
            if isinstance(permission, str):
                perm = Permission.objects.get(codename=permission)
            else:
                perm = permission
            group.permissions.add(perm)
        group.save()


class Migration(migrations.Migration):
    dependencies = []

    operations = [
        migrations.RunPython(create_groups),
    ]
