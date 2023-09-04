from django.urls import path
from clickup import views

urlpatterns = [
    path("register/", views.SingUpView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("create_project/", views.ProjectCreateView.as_view(), name="Create_project"),
    path("project/<int:pk>/", views.ProjectRetrieveUpdateDestroyView.as_view(), name="project"),
    path("create_task/",views.TaskCreateView.as_view(),name="create_task"),
]
