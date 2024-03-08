from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from ..models import Product
from ..serializers import ProductAdminSerializer


class ProductAdminListView(APIView):
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    serializer = ProductAdminSerializer

    def get(self, request):
        queryset = self.queryset.all()
        serializer = self.serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
        print(f"{product} deleted successfully")
        return Response(status=status.HTTP_204_NO_CONTENT)
