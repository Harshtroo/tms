from django.db import models
from django.contrib.auth.models import User
from django_extensions.db.models import TimeStampedModel
from clickup.choices import PRIORITY_CHOICES,STATUS_CHOICES

class Project(TimeStampedModel):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name


class Task(TimeStampedModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE)
    due_date = models.DateField()
    priority = models.CharField(max_length=20,choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    description = models.TextField(null=True)

    def __str__(self):
        return self.name
