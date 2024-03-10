from pytz import timezone
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwnerOrAdmin
from ..models import Order, ShippingAddress
from ..serializers import OrderSerializer
from ..mixins import CustomObjectMixin


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


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderDetailView(APIView, CustomObjectMixin):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get(self, request, pk):
        order = self.get_obj(pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderUpdateToPaidView(APIView, CustomObjectMixin):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def put(self, request, pk):
        order = self.get_obj(pk)
        order.is_paid = True
        order.paid_at = datetime.now(timezone("Asia/Tehran"))
        order.save()

        return Response(
            {"detail": f"Order {pk} updated successfully"}, status=status.HTTP_200_OK
        )
