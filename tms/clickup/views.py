from rest_framework import status
from rest_framework.generics import CreateAPIView
from clickup.serializer import RegistrationSerializer, LoginSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import JsonResponse


class SingUpView(CreateAPIView):
    serializer_class = RegistrationSerializer


class LoginView(ObtainAuthToken):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key,
                             "user": user.username,
                             "message": "Successfully logged in."}, status=status.HTTP_200_OK)
