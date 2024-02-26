from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer, UserSerializer


class RouteList(APIView):
    def get(self, request):
        routes = [
            "api/products/",
            "api/products/create/",
            "api/products/upload/",
            "api/products/<id>/reviews/",
            "api/products/top/",
            "api/products/<id>/",
            "api/products/delete/<id>/",
            "api/products/update/<id>/",
        ]
        return Response(routes)


class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserList(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductList(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetail(APIView):
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
