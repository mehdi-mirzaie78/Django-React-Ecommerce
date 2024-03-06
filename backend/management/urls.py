from django.urls import path
from accounts.views import admin_views as accounts_admin_views

urlpatterns = [
    path("user/list/", accounts_admin_views.UserListView.as_view(), name="user-list"),
]
