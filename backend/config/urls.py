from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{settings.API_PREFIX}/products/", include("products.urls")),
    path(f"{settings.API_PREFIX}/users/", include("accounts.urls")),
    path(f"{settings.API_PREFIX}/orders/", include("orders.urls")),
    path(f"{settings.API_PREFIX}/management/", include("management.urls")),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
