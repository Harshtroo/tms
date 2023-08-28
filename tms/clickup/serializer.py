from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class GroupSerializer(serializers.Serializer):
    class Meta:
        model = Group
        fields = ["name", "permissions"]


class RegistrationSerializer(serializers.ModelSerializer):
    password_conform = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "groups", "password", "password_conform", "username"]
        extra_kwargs = {"email": {"required": True},
                        "password": {"write_only": True},
                        }

    def create(self, validated_data):
        if validated_data.get("password") != validated_data.get("password_conform"):
            raise serializers.ValidationError("Those password don't match")
        elif validated_data.get("password") == validated_data.get("password_conform"):
            validated_data["password"] = make_password(validated_data.get("password"))

        validated_data.pop('password_conform')
        groups_data = validated_data.pop('groups', [])
        user = super().create(validated_data)
        user.save()
        user.groups.add(*groups_data)
        return user
