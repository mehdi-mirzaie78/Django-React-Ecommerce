from django.urls import path
from . import views

urlpatterns = [path("add/", views.OrderAddView.as_view(), name="order-add")]
