from django.db import models
from account.models import User

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    code = models.CharField(max_length=10)
    workspace = models.CharField(max_length=2048)
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='users')

class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatmessage')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project')
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=150)


class Bucket(models.Model):
    projectForeignKey = models.CharField(max_length=30)
    name = models.CharField(max_length=30) 

class MonitorData(models.Model):
    BucketID = models.ForeignKey(Bucket, on_delete=models.CASCADE, related_name='projectForeignKeys')
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.CharField(max_length=150)
