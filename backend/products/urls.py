from django.urls import path
from .views import views

urlpatterns = [
    path("", views.ProductListView.as_view(), name="product-list"),
    path(
        "top-rated/",
        views.ProductTopRatedListView.as_view(),
        name="product-list-top-rated",
    ),
    path("<int:pk>/", views.ProductDetailView.as_view(), name="product-detail"),
    path("<int:pk>/reviews/", views.ReviewCreateView.as_view(), name="review-add"),
]
