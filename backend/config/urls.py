from django.contrib import admin
from django.views.static import serve
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{settings.API_PREFIX}/products/", include("products.urls")),
    path(f"{settings.API_PREFIX}/users/", include("accounts.urls")),
    path(f"{settings.API_PREFIX}/orders/", include("orders.urls")),
    path(f"{settings.API_PREFIX}/management/", include("management.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += [
        re_path(
            r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}
        ),
    ]
    urlpatterns += [
        re_path(
            r"^media/(?P<path>.*)$",
            serve,
            {
                "document_root": settings.MEDIA_ROOT,
            },
        ),
    ]
