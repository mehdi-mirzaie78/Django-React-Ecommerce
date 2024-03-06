from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView as LoginUser
from . import views

urlpatterns = [
    path("login/", LoginUser.as_view(), name="user-login"),
    path("register/", views.RegisterUserView.as_view(), name="user-register"),
    path("profile/", views.UserProfileView.as_view(), name="user-profile"),
]
