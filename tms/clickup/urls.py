from django.urls import path
from clickup import views

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("get_register/", views.get_register_page, name="get_register"),
    path("login_page/", views.get_login_page, name="login_page"),
    path("register/", views.SignUpView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("create_project/", views.ProjectAPIView.as_view(), name="create_project"),
    path("projects/<int:pk>/",views.ProjectAPIView.as_view(),name="project"),
    path("create_task/", views.TaskCreateView.as_view(), name="create_task"),
]
