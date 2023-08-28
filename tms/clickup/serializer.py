from django.contrib.auth.models import User, Group
from rest_framework import serializers


class GroupSerializer(serializers.Serializer):
    class Meta:
        model = Group
        fields = ["name", "permissions"]


class SingUpSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["first_name", "last_name", "full_name", "email", "groups", "password", "username"]
        extra_kwargs = {"email": {"required": True},
                        "groups": {"required": True},
                        "password": {"write_only": True},
                        }

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def create(self, validated_data):
        groups_data = validated_data.pop('groups', [])
        user = User.objects.create(
            username=validated_data.get("username"),
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            email=validated_data.get("email"),
            password=validated_data.get("password"),
        )
        user.save()
        for group in groups_data:
            user.groups.add(group)
        return user
