from django.contrib import admin
from django.apps import apps
# Register your models here.

models = apps.get_models()

# Small code to ensure every model previously defined is recognised by the Django system.
# If not recognised, it is added to the system. If it is, it is ignored.
for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass