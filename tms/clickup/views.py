from requests import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView
from clickup.serializer import RegistrationSerializer, LoginSerializer
from django.http import JsonResponse
from rest_framework.views import APIView


class SingUpView(CreateAPIView):
    serializer_class = RegistrationSerializer


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.save()
        return JsonResponse({'token': token.key,
                             "message": "Successfully login."}, status=status.HTTP_200_OK)
