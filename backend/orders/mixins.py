from rest_framework.exceptions import NotFound
from .models import Order


class CustomObjectMixin:
    def get_obj(self, pk):
        queryset = Order.objects.filter(pk=pk)
        if not queryset.exists():
            raise NotFound(detail="Order Not Found")
        obj = queryset.get()
        self.check_object_permissions(self.request, obj)
        return obj
