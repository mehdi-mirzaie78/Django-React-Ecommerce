from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView as LoginUser
from . import views

urlpatterns = [
    path("users/login/", LoginUser.as_view(), name="user-login"),
    path("users/register/", views.RegisterUser.as_view(), name="user-register"),
    path("users/profile/", views.UserProfile.as_view(), name="user-profile"),
    path("users/", views.UserList.as_view(), name="user-list"),
    path("products/", views.ProductList.as_view(), name="product-list"),
    path("products/<str:pk>", views.ProductDetail.as_view(), name="product-detail"),
]
