from django.http import HttpResponse
from django.shortcuts import render

def project_space_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/projectspace.html", args)

def monitor_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/monitor.html", args)

def settings_view(request, appcode, *args, **kwargs):
    if request.method == "GET":
        args = {}
        args["appcode"] = appcode
        return render(request, "application/settings.html", args)

def dashboard_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "application/dashboard.html")