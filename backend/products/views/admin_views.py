from django.db.models import Q
from django.core.paginator import Paginator
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from ..models import Product
from ..serializers import ProductAdminSerializer
from ..mixins import ProductListMixin


class ProductAdminListView(APIView, ProductListMixin):
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    serializer = ProductAdminSerializer

    def get(self, request):
        self._fiter_queryset_by_search_param(request)
        products = self._paginate(request, 10)
        serializer = self.serializer(products, many=True)
        return Response(
            {"products": serializer.data, "page": self.page, "pages": self.last_page},
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.create(request)
        return Response(self.serializer(instance).data, status=status.HTTP_201_CREATED)


class ProductAdminDetailView(APIView):
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    serializer = ProductAdminSerializer

    def get_obj(self, pk):
        queryset = self.queryset.filter(pk=pk)
        if not queryset.exists():
            raise NotFound(detail="Product Not Found")
        return queryset.get()

    def get(self, request, pk):
        product = self.get_obj(pk)
        serializer = self.serializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        product = self.get_obj(pk)
        serializer = self.serializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        product = self.get_obj(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
