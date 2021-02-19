from django.http import HttpResponse
from django.shortcuts import render
import secrets
from application.workspace_handlers import AddSocketConnection

def project_space_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        webSocketKey = secrets.token_hex(nbytes=16)
        AddSocketConnection(webSocketKey,"a")
        args["websocket_key"] = webSocketKey
        return render(request, "application/projectspace.html", args)

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