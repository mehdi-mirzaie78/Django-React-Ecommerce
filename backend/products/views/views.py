from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from accounts.models import User
from ..models import Product
from ..exceptions import ProductAlreadyReviewed
from ..serializers import ProductSerializer, ReviewSerializer


class ProductListView(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailView(APIView):
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]
    serializer = ReviewSerializer

    @staticmethod
    def _get_product(pk) -> Product:
        queryset = Product.objects.filter(pk=pk).prefetch_related("reviews")
        if not queryset.exists():
            raise NotFound(
                detail="Product that you want to write a review for it not found"
            )
        return queryset.get()

    @staticmethod
    def _check_is_product_already_reviewed(product: Product, user: User) -> bool:
        if product.reviews.filter(user=user).exists():
            raise ProductAlreadyReviewed()

    def post(self, request, pk):
        user = request.user

        product = self._get_product(pk)
        self._check_is_product_already_reviewed(product, user)

        request.data.update({"product": pk})
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            product.update_product_rating_based_on_reviews()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        error_response = "".join(
            [
                f"{error}: {' '.join(message)}"
                for error, message in serializer.errors.items()
            ]
        )
        return Response({"detail": error_response}, status=status.HTTP_400_BAD_REQUEST)
