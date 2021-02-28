from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
import secrets
from application.ws_handlers import AddSocketConnection

@login_required
def project_space_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}

        #Collecting the project appcode from the URL
        args["appcode"] = appcode

        #Creating a secure websocket key
        webSocketKey = secrets.token_hex(nbytes=16)
        AddSocketConnection(webSocketKey,"username")
        args["websocket_key"] = webSocketKey

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