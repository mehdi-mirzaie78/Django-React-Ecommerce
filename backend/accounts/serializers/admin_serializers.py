from rest_framework import serializers
from ..models import User


class UserAdminSerializer(serializers.ModelSerializer):
    is_admin = serializers.BooleanField(source="is_staff")
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "name",
            "first_name",
            "last_name",
            "email",
            "is_admin",
            "is_active",
        ]

    def get_name(self, obj: User) -> str:
        if obj.first_name == "" and obj.last_name == "":
            return obj.email
        return f"{obj.first_name} {obj.last_name}"
