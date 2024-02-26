from typing import Any, Dict
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "password"]

    def validate(self, data):
        email = data.get("email")
        username = data.get("username")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email is already in use"})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                {"username": "Username is already in use"}
            )
        return data

    def save(self, *args, **kwargs):
        user = User(
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            username=self.validated_data["username"],
            email=self.validated_data["email"],
        )
        password = self.validated_data["password"]
        user.set_password(password)
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value
        return data


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.BooleanField(source="is_staff")

    class Meta:
        model = User
        fields = ["id", "username", "name", "email", "is_admin"]

    def get_name(self, obj: User) -> str:
        if obj.first_name == "":
            return obj.email
        return obj.first_name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["token"]

    def get_token(self, obj: User) -> str:
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "_id",
            "user",
            "name",
            "image",
            "brand",
            "category",
            "description",
            "rating",
            "numReviews",
            "price",
            "countInStock",
            "reviews",
        ]

    user = serializers.StringRelatedField()
