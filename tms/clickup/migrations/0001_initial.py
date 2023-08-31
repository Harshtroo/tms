# Generated by Django 4.2.4 on 2023-08-28 13:05

from django.db import migrations
from django.contrib.auth.models import Group, Permission
from django.db import transaction


def create_groups(apps, schema_editor):
    GROUP_CHOICES = {
        "Admin": Permission.objects.all(),
        "Project Manager": ["add_project", "change_project", "delete_project", "add_task", "change_task",
                            "delete_task"],
        "Developer": ["add_task", "change_task", "delete_task"]}

    with transaction.atomic():
        for group_name, permissions in GROUP_CHOICES.items():
            group, created = Group.objects.get_or_create(name=group_name)

            for permission in permissions:
                if isinstance(permission, str):
                    try:
                        permission = Permission.objects.get(codename=permission)
                        group.permissions.add(permission)
                    except Permission.DoesNotExist:
                        pass
                else:
                    group.permissions.add(permission)
            group.save()


class Migration(migrations.Migration):
    dependencies = []

    operations = [
        migrations.RunPython(create_groups),
    ]
