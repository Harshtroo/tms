from django.urls import path, include
from clickup import views

urlpatterns = [
    path("register/", views.SingUpView.as_view(), name="register"),
    path("login/",views.LoginView.as_view(),name="login"),
]
