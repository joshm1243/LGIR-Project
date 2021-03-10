from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

# Create your views here.
def login_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "accounts/login")
    
def front_view(request, *args, **kwargs):
    if request.method == "GET":
        return redirect("accounts/login")

def top_nav_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "account/topnav.html")

def handler404(request, *args, **argv):
    if request.method == "GET":
        return render(request, "generic/404.html")