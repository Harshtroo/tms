from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from clickup.serializer import RegistrationSerializer, LoginSerializer, ProjectSerializer, TaskSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from clickup.models import Project, Task
from django.shortcuts import render


def get_home_page(request):
    return render(request, "home.html")


def get_register_page(request):
    group = Group.objects.all()
    return render(request, "register.html", {"group": group})


def get_login_page(request):
    return render(request, "login.html")


class SingUpView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return JsonResponse({"data": serializer.data, "status": "success", "success_message": "Register successfully"},
                            status=status.HTTP_201_CREATED)


class LoginView(ObtainAuthToken):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({"token": token.key,
                             "status": "success",
                             "user": user.username,
                             "success_message": "Successfully logged in."}, status=status.HTTP_200_OK)


class ProjectCreateView(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [DjangoModelPermissions]


class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]


class TaskCreateView(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [DjangoModelPermissions]
