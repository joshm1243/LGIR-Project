from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from application.models import Project
import secrets

import application.wshandlers.auth as wsauth

# Project space - main workspace page.
def project_space_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}

        #Collecting the project appcode from the URL
        args["appcode"] = appcode

        #Creating a secure websocket key
        token = secrets.token_hex(nbytes=16)
        wsauth.Remember(token,request.user.username)
        args["websocket_key"] = token

        return render(request, "application/workspace.html", args)

@login_required
# Monitor view. Used for viewing data on pin-mappings through Python scripts.
def monitor_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/monitor.js", args)

@login_required
# Settings page for related projects.
def settings_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/settings.html", args)

@login_required
# Main dashboard page that shows all projects the User has access to.
def dashboard_view(request, *args, **kwargs):
    print(request.user.is_authenticated)
    if request.method == "GET":
        projectJSON = "["
        for project in Project.objects.filter(user=request.user):
            projectJSON += "{'id':'" + str(project.id) + "','name':'"  + project.name
            projectJSON += "','code':'" + project.code + "'},"
        projectJSON += "]"
        args = {}
        args["projects"] = projectJSON
        return render(request, "application/dashboard.html", args)