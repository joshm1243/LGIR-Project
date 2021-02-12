from django.shortcuts import render

# Create your views here.
def login_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "account/login.html")

def top_nav_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "account/topnav.html")