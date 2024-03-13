from django.db.models import Q, QuerySet
from django.core.paginator import Paginator


class ProductListMixin:
    queryset: QuerySet

    def _fiter_queryset_by_search_param(self, request) -> None:

        if search := request.query_params.get("search"):
            self.queryset = self.queryset.filter(
                Q(name__icontains=search)
                | Q(brand__icontains=search)
                | Q(category__icontains=search)
            )

    def _get_page_from_query_params(self, request) -> int:

        page = request.query_params.get("page", 1)
        if isinstance(page, str) and page.isnumeric():
            return int(page)
        return 1

    def _paginate(self, request, num_per_page: int) -> list:
        paginator = Paginator(self.queryset, num_per_page)
        self.page = self._get_page_from_query_params(request)
        self.last_page = paginator.num_pages

        if 1 <= self.page <= self.last_page:
            return paginator.page(self.page)
        return paginator.page(self.last_page)
