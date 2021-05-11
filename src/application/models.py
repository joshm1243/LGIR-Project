from django.db import models
from account.models import User

# Create your models here.

# Linked to User. A User has many Projects.
class Project(models.Model):
    def __str__(self):
        # Formatting for Django Admin back-end. Easier usage.
        return f'({self.id}) {self.name} '

    name = models.CharField(max_length=30)  # Project name.
    description = models.CharField(max_length=150, blank=True, default='') # Project description.
    
    code = models.CharField(max_length=10)  # Used for adding projects by code.
    workspace = models.CharField(max_length=2048, blank=True, default='')   # Stores the workspace as a JSON in this section.
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='users')   # User that the project is assigned to.

# Linked to Project. A Project has many Chats (logged messages).
class Chat(models.Model):
    # Each message sent in the chat is logged and placed into a Chat model.
    def __str__(self):
        # Formatting for Django Admin back-end. Easier usage.
        return f'({self.project.name} | {self.id}) {self.user.username} : {self.message} - {self.timestamp.strftime("%d-%m-%Y | %H:%M:%S")}'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatmessage')    # User that posts the message
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project')  # Project where message was posted
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=150)


# Linked to Project. A Project has many Buckets.
class Bucket(models.Model):
    projectForeignKey = models.CharField(max_length=30)
    name = models.CharField(max_length=30) 


# Linked to Project. A project has many MonitorDatas.
class MonitorData(models.Model):
    BucketID = models.ForeignKey(Bucket, on_delete=models.CASCADE, related_name='projectForeignKeys')
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.CharField(max_length=150)

# Linked to Project. A project has many ProjectMappings.
class ProjectMappings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_mapping_users")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_mapping_project')