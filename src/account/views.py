from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

# Create your views here.
def login_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "account/login.html")
    
def front_view(request, *args, **kwargs):
    if request.method == "GET":
        return redirect("/login")

def top_nav_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "account/topnav.html")