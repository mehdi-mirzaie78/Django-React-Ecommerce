from typing import Any, Dict
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "password"]

    def save(self):
        user = self.instance
        if password := self.validated_data.get("password"):
            self.validated_data.pop("password")
            user.set_password(password)

        for key, value in self.validated_data.items():
            setattr(user, key, value)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.BooleanField(source="is_staff")

    class Meta:
        model = User
        fields = ["id", "name", "email", "is_admin"]

    def get_name(self, obj: User) -> str:
        if obj.first_name == "" and obj.last_name == "":
            return obj.email
        return f"{obj.first_name} {obj.last_name}"


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["token"]

    def get_token(self, obj: User) -> str:
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value
        return data


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "password"]

    def validate(self, data):
        email = data.get("email")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email is already in use")
        return data

    def save(self):
        user = User(
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            email=self.validated_data["email"],
        )
        password = self.validated_data["password"]
        user.set_password(password)
        user.save()
        return user
