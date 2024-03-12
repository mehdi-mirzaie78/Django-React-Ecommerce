from typing import Any
from rest_framework.views import Response
from rest_framework.views import exception_handler


def api_exception_handler(exc: Exception, context: dict[str, Any]) -> Response:
    response = exception_handler(exc, context)

    if response is not None:

        error_payload = {
            "error": {
                "status_code": 0,
                "detail": [],
            }
        }
        error = error_payload["error"]
        status_code = response.status_code
        detail = response.data.values()

        detail_list = [" ".join(i) for i in detail if isinstance(i, list)]
        detail = " ".join(detail_list) if len(detail_list) != 0 else detail
        error["status_code"] = status_code
        error["detail"] = detail
        response.data = error_payload
    return response
