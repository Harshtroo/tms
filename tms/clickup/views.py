from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from clickup.serializer import SingUpSerializer


class SingUpView(CreateAPIView):
    serializer_class = SingUpSerializer
