from django.urls import path, include
from django.contrib import admin

urlpatterns = [

    path("admin/", admin.site.urls),
    path("", include("clickup.urls")),
    path("summernote/", include("django_summernote.urls")),
]
