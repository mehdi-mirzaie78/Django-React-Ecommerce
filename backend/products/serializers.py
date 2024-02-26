from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
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
