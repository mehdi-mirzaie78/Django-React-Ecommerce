from rest_framework import status
from rest_framework.exceptions import APIException


class ProductAlreadyReviewed(APIException):
    default_detail = "This product is already reviewed"
    status_code = status.HTTP_400_BAD_REQUEST
