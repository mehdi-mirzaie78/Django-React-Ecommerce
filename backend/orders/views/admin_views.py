from pytz import timezone
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAdminUser
from ..models import Order
from ..serializers import OrderAdminSerializer
from ..mixins import CustomObjectMixin


class OrderAdminListView(APIView):
    permission_classes = [IsAdminUser]
    queryset = Order.objects.all()
    serializer = OrderAdminSerializer

    def get(self, request):
        queryset = self.queryset.all()
        serializer = self.serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderAdminDetailView(APIView):
    permission_classes = [IsAdminUser]
    queryset = Order.objects.all()
    serializer = OrderAdminSerializer

    def get_obj(self, pk):
        queryset = self.queryset.filter(pk=pk)
        if not queryset.exists():
            raise NotFound(detail="Order Not Found")
        return queryset.get()

    def get(self, request, pk):
        order = self.get_obj(pk)
        serializer = self.serializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        order = self.get_obj(pk)
        serializer = self.serializer(order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
