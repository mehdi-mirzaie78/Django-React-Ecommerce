from pytz import timezone
from datetime import datetime
from rest_framework import serializers
from accounts.serializers import UserAdminSerializer
from ..models import Order, OrderItem, ShippingAddress


class ShippingAddressAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderItemAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderAdminSerializer(serializers.ModelSerializer):
    user = UserAdminSerializer(read_only=True)
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_order_items(self, obj):
        return OrderItemAdminSerializer(obj.items.all(), many=True).data

    def get_shipping_address(self, obj):
        return ShippingAddressAdminSerializer(obj.shipping_address).data

    def save(self, **kwargs):
        if not self.instance.is_delivered and self.validated_data.get("is_delivered"):
            self.instance.delivered_at = datetime.now(timezone("Asia/Tehran"))

        if not self.instance.is_paid and self.validated_data.get("is_paid"):
            self.instance.paid_at = datetime.now(timezone("Asia/Tehran"))
        return super().save(**kwargs)
