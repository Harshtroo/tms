from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate,login
from clickup import constant
from clickup.models import Project, Task
from django_summernote.fields import SummernoteTextField


class RegistrationSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "groups", "password", "password_confirm", "username"]
        extra_kwargs = {"email": {"required": True},
                        "password": {"write_only": True},
                        }

    def create(self, validated_data):
        if validated_data.get("password") != validated_data.get("password_confirm"):
            raise serializers.ValidationError(constant.PASSWORD_ERROR_MESSAGE)
        validated_data["password"] = make_password(validated_data.get("password"))
        validated_data.pop('password_confirm')
        user = super().create(validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])
        if not user:
            raise serializers.ValidationError({"error": constant.LOGIN_ERROR_MESSAGE})
        return user


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "description"]
        extra_kwargs = {"name": {"required": True}, }


class TaskSerializer(serializers.ModelSerializer):
    description = SummernoteTextField()
    project_name = serializers.SerializerMethodField()
    assignee_username = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ["id", "project", "name", "assignee", "due_date", "priority", "status", "description","project_name","assignee_username"]

    @staticmethod
    def get_project_name(instance):
        return instance.project.name

    @staticmethod
    def get_assignee_username(instance):
        return instance.assignee.username
