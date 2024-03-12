from rest_framework import serializers
from ..models import Product, Review


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    reviews = serializers.SerializerMethodField()

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
            "num_reviews",
            "price",
            "count_in_stock",
            "reviews",
        ]

    def get_reviews(self, obj: Product):
        queryset = obj.reviews.all()
        return ReviewSerializer(queryset, many=True).data


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ["id", "product", "user", "name", "rating", "comment", "created_at"]

    def validate_rating(self, value):
        if 0 < value <= 5:
            return value
        raise serializers.ValidationError("rating must be an integer between 1 to 5.")

    def save(self, **kwargs):
        user = kwargs.get("user")
        if not self.validated_data.get("name"):
            self.validated_data["name"] = f"{user.first_name} {user.last_name}"
        return super().save(**kwargs)
