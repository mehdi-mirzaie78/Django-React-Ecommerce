from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    path("users/login/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("users/register/", views.UserRegister.as_view(), name="user-register"),
    path("users/profile/", views.UserProfile.as_view(), name="user-profile"),
    path("users/", views.UserList.as_view(), name="user-list"),
    path("products/", views.ProductList.as_view(), name="product-list"),
    path("products/<str:pk>", views.ProductDetail.as_view(), name="product-detail"),
]
