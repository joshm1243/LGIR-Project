from django.db import models
from account.models import User

# Create your models here.

class Project(models.Model):
    def __str__(self):
        return f'({self.id}) {self.name}'

    name = models.CharField(max_length=30)  # Project name.
    description = models.CharField(max_length=150, blank=True, default='') # Project description.

    
    code = models.CharField(max_length=10)  # Used for adding projects by code.
    workspace = models.CharField(max_length=2048, blank=True, default='')   # Stores the workspace as a JSON in this section.
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='users')   # User that the project is assigned to.

class Chat(models.Model):
    def __str__(self):
        return f'({self.project.name} | {self.id}) {self.user.username} : {self.message} - {self.timestamp}'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatmessage')    # User that posts the message
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project')  # Project where message was posted
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=150)


class Bucket(models.Model):
    projectForeignKey = models.CharField(max_length=30)
    name = models.CharField(max_length=30) 

class MonitorData(models.Model):
    BucketID = models.ForeignKey(Bucket, on_delete=models.CASCADE, related_name='projectForeignKeys')
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.CharField(max_length=150)
