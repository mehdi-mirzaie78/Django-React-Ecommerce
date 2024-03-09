from rest_framework import serializers
from ..models import Product


class ProductAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

    def create(self, request):
        self.validated_data["user"] = request.user
        return super().create(self.validated_data)
