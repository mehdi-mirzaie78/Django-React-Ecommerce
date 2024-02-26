from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView as LoginUser
from . import views

urlpatterns = [
    path("", views.UserList.as_view(), name="user-list"),
    path("login/", LoginUser.as_view(), name="user-login"),
    path("register/", views.RegisterUser.as_view(), name="user-register"),
    path("profile/", views.UserProfile.as_view(), name="user-profile"),
]
