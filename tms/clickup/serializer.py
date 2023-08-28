from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from clickup import constant


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
            raise serializers.ValidationError(constant.password_not_match)
        validated_data["password"] = make_password(validated_data.get("password"))
        validated_data.pop('password_confirm')
        user = super().create(validated_data)
        return user
