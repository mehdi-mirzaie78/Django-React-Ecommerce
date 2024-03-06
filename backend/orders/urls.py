from django.urls import path
from . import views

urlpatterns = [
    path("add/", views.OrderAddView.as_view(), name="order-add"),
    path("list/", views.OrderListView.as_view(), name="orders-list"),
    path("<int:pk>/", views.OrderDetailView.as_view(), name="order-detail"),
    path("<int:pk>/pay/", views.OrderUpdateToPaidView.as_view(), name="order-pay"),
]
