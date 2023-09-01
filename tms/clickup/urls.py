from django.urls import path, include
from clickup import views

urlpatterns = [
    path("register/", views.SingUpView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("create_project/", views.ProjectCreateView.as_view(), name="Create_project"),
    path("update_project/<int:pk>/",views.ProjectUpdateView.as_view(),name="update_project"),
    path("delete_project/<int:pk>/",views.ProjectDeleteView.as_view(),name="delete_project"),
]
