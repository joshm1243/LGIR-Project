from django.db import models

class Profiles(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=200)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)