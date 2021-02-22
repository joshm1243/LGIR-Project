from django.http import HttpResponse
from django.shortcuts import render
import secrets
from application.ws_handlers import AddSocketConnection

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

def monitor_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/monitor.js", args)

def settings_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/settings.html", args)

def dashboard_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "application/dashboard.html")