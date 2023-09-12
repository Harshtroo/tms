from django.contrib import admin
from clickup.models import Project, Task
from django_summernote.admin import SummernoteModelAdmin

admin.site.register(Project)


class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ("description",)


admin.site.register(Task, PostAdmin)
