from rest_framework import status
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from clickup.serializer import RegistrationSerializer, LoginSerializer, ProjectSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from clickup.models import Project


class SingUpView(CreateAPIView):
    serializer_class = RegistrationSerializer


class LoginView(ObtainAuthToken):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key,
                             "user": user.username,
                             "message": "Successfully logged in."}, status=status.HTTP_200_OK)


class ProjectCreateView(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [DjangoModelPermissions]


class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
