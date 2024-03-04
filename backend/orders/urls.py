from django.urls import path
from . import views

urlpatterns = [
    path("add/", views.OrderAddView.as_view(), name="order-add"),
    path("<int:pk>/", views.OrderDetailView.as_view(), name="order-detail"),
    path("<int:pk>/pay/", views.OrderUpdateToPaid.as_view(), name="order-pay"),
]
