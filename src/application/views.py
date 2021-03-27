from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
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
        return render(request, "application/dashboard.html")