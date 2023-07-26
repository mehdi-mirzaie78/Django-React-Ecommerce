from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .products import products


class RouteList(APIView):
    def get(self, request):
        routes = [
            'api/products/',
            'api/products/create/',
            'api/products/upload/',
            'api/products/<id>/reviews/',
            'api/products/top/',
            'api/products/<id>/',
            'api/products/delete/<id>/',
            'api/products/update/<id>/',
        ]
        return Response(routes)


class ProductList(APIView):
    def get(self, request):
        return Response(products, status=status.HTTP_200_OK)


class ProductDetail(APIView):
    def get(self, request, pk):
        product = None
        for p in products:
            if p['_id'] == pk:
                product = p
                break
        return Response(product, status=status.HTTP_200_OK)
