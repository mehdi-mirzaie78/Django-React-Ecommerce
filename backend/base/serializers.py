from typing import Any, Dict
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        data["username"] = self.user.username
        data["email"] = self.user.email
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


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
