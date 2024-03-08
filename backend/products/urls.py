from django.urls import path
from .views import views

urlpatterns = [
    path("", views.ProductListView.as_view(), name="product-list"),
    path("<str:pk>/", views.ProductDetailView.as_view(), name="product-detail"),
]
