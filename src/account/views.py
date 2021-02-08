from django.shortcuts import render

# Create your views here.
def login_view(request, *args, **kwargs):
    if request.method == "GET":
        return render(request, "account/login.html")

