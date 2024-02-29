from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer


class OrderAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        order_items = data["orderItems"]
        shipping_address = data["shippingAddress"]

        order = Order.create_order_from_data(request.user, data)
        ShippingAddress.create_shipping_address_from_data(order, shipping_address)
        order.create_order_items_and_update_stock(order_items)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
