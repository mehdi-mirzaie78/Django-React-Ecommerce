from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from ..models import User
from ..serializers import UserAdminSerializer


class UserAdminListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = User.objects.all()
        serializer = UserAdminSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserAdminDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get_obj(self, pk):
        queryset = User.objects.filter(pk=pk)
        if not queryset.exists():
            raise NotFound(detail="User Not Found")
        return queryset.get()

    def get(self, request, pk):
        user = self.get_obj(pk)
        serializer = UserAdminSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = self.get_obj(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        user = self.get_obj(pk)
        serializer = UserAdminSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
