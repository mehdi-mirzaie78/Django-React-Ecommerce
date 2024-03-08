from django.urls import path
from accounts.views import admin_views as accounts_admin_views
from products.views import admin_views as products_admin_views

urlpatterns = [
    path(
        "user/list/", accounts_admin_views.UserAdminListView.as_view(), name="user-list"
    ),
    path(
        "user/<int:pk>/",
        accounts_admin_views.UserAdminDetailView.as_view(),
        name="user-detail",
    ),
    path(
        "product/list/",
        products_admin_views.ProductAdminListView.as_view(),
        name="product-list",
    ),
    path(
        "product/<int:pk>/",
        products_admin_views.ProductAdminDetailView.as_view(),
        name="product-detail",
    ),
]
