from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from application.models import Project
import secrets

import application.wshandlers.auth as wsauth

#@login_required
def project_space_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}

        #Collecting the project appcode from the URL
        args["appcode"] = appcode

        #Creating a secure websocket key
        token = secrets.token_hex(nbytes=16)
        wsauth.Remember(token,request.user.username)
        args["websocket_key"] = token

        # currProject = Project.objects.get(name=appcode)
        # args["workspace_data"] = currProject.workspace
        # print(currProject.workspace)

        return render(request, "application/workspace.html", args)

@login_required
def monitor_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/monitor.js", args)

@login_required
def settings_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/settings.html", args)

@login_required
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