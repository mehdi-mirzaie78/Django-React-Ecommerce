from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer


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
