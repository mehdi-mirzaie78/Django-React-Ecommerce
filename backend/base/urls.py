from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    path("users/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("", views.RouteList.as_view(), name="route-list"),
    path("products/", views.ProductList.as_view(), name="product-list"),
    path("products/<str:pk>", views.ProductDetail.as_view(), name="product-detail"),
]
