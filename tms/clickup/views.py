from django.contrib.auth import login, logout
from django.contrib.auth.models import Group, User
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from clickup.serializer import RegistrationSerializer, LoginSerializer, ProjectSerializer, TaskSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from clickup.models import Project, Task
from django.shortcuts import render
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from clickup import constant
from rest_framework.views import APIView


class HomeView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'home.html'

    def get(self, request):
        project = Project.objects.all()
        queryset = User.objects.filter(is_active=True)
        return Response({'request': request, "queryset": queryset, "project": project})


def get_register_page(request):
    group = Group.objects.all()
    return render(request, "register.html", {"group": group})


def get_login_page(request):
    return render(request, "login.html")


def get_create_project_page(request):
    return render(request, "project.html")


class SingUpView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        context = {
            "status": "success",
            "success_message": constant.REGISTER_SUCCESS_MESSAGE
        }
        return Response({
            "data": serializer.data,
            **context
        }, status=status.HTTP_201_CREATED)


class LoginView(ObtainAuthToken):

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        context = {
            "token": token.key,
            "user": user.username,
            "status": "success",
            "success_message": constant.LOGIN_SUCCESS_MESSAGE
        }
        return Response({
            "data": serializer.data,
            **context
        }, status=status.HTTP_201_CREATED)


class LogoutView(APIView):

    def post(self, request):
        if request.user.is_authenticated:
            token = request.user.auth_token
            token.delete()
            logout(request)
            context = {
                "status": "success",
                "success_message": constant.LOGOUT_MESSAGE,
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class ProjectAPIView(ListCreateAPIView, RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [DjangoModelPermissions]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            context = {"data": serializer.data, "success_message": constant.CREATE_PROJECT_SUCCESS}
            return Response(context, status=status.HTTP_201_CREATED)


class TaskCreateView(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [DjangoModelPermissions]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            context = {"data": serializer.data, "success_message": constant.CREATE_TASK_SUCCESS}
            return Response(context, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
