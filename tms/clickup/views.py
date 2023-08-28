from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from clickup.serializer import RegistrationSerializer


class SingUpView(CreateAPIView):
    serializer_class = RegistrationSerializer
