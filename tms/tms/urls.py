from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.conf import settings
from django.views.generic.base import TemplateView

urlpatterns = [

    path("admin/", admin.site.urls),
    path("", include("clickup.urls")),
    path("summernote/", include("django_summernote.urls")),
]
