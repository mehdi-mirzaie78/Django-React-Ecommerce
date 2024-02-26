from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User


class GroupAdmin(admin.ModelAdmin):
    filter_horizontal = ("permissions",)


class GroupNewMeta:
    proxy = True
    app_label = User._meta.app_label


group_model = type("Group", (Group,), {"__module__": "", "Meta": GroupNewMeta})

admin.site.register(User)
admin.site.unregister(Group)
admin.site.register(group_model, GroupAdmin)
