from django.urls import path
from . import views

urlpatterns = [
    path("", views.ProductList.as_view(), name="product-list"),
    path("<str:pk>/", views.ProductDetail.as_view(), name="product-detail"),
]
