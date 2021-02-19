from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    USER_TYPE_CHOICES = (
      (1, 'default'),
      (2, 'admin')
  )

  user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)

# Storing the model for projects here as the two are linked.

class Project(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    # Other relevant attributes of an appplication go here?

    def __str__(self):
        return self.name