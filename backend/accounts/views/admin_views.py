from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from ..models import User
from ..serializers import (
    UserSerializer,
)


class UserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get_obj(self, pk):
        queryset = User.objects.filter(pk=pk)
        if not queryset.exists():
            raise NotFound(detail="User Not Found")
        return queryset.get()

    def get(self, request, pk):
        user = self.get_obj(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = self.get_obj(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
