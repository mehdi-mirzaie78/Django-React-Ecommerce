from pytz import timezone
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwnerOrAdmin
from .models import Order, ShippingAddress
from .serializers import OrderSerializer


class OrderAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        order_items = data["order_items"]
        shipping_address = data["shipping_address"]

        order = Order.create_order_from_data(request.user, data)
        ShippingAddress.create_shipping_address_from_data(order, shipping_address)
        order.create_order_items_and_update_stock(order_items)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_obj(self, pk):
        queryset = Order.objects.filter(pk=pk)
        if not queryset.exists():
            raise NotFound(detail="Order Not Found")
        obj = queryset.get()
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, pk):
        order = self.get_obj(pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderUpdateToPaid(APIView):
    def get(self, request, pk):
        queryset = Order.objects.filter(pk=pk)
        if not queryset.exists():
            raise NotFound(detail="Order Not Found")
        queryset.update(is_paid=True, paid_at=datetime.now(timezone("Asia/Tehran")))
        return {"msg": f"Order {pk} updated successfully"}
