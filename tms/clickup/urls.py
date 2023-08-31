from django.urls import path, include
from clickup import views

urlpatterns = [
    path("register/", views.SingUpView.as_view(), name="register"),
]
