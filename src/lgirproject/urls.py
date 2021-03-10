"""lgirproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.urls import re_path
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from application.views import project_space_view, monitor_view, settings_view, dashboard_view
from account.views import login_view, top_nav_view, front_view, handler404
from django.conf import settings
from django.contrib.auth import views as auth_views

urlpatterns = [

    #
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    #
    path('application/<str:appcode>/workspace/', project_space_view, name="project_space"),
    path('application/<str:appcode>/monitor/', monitor_view, name="monitor"),
    path('application/<str:appcode>/settings/', settings_view, name="settings"),
    path('dashboard/', dashboard_view, name="dashboard"),
    path('',front_view, name="front_view"),

    #path('application/settings/', settings_view, name="settings"),
    #path('application/projectspace/', project_space_view, name="project_space"),
    #path('',login_view, name='login'),

    # patterns('lgirproject.views',
    # (r'^$','DEF_FUNCTION'),

    path('public/generics/inward/top-nav/', top_nav_view, name="top_nav"),
    re_path(r'.*', handler404, name = "handler404")

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)