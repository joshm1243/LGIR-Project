from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

# Basic Django User model - used instead of default for easy modification later on if necessary.
class User(AbstractUser):
    USER_TYPE_CHOICES = (
      (1, 'default'),
      (2, 'admin')
    )  
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES,default=1)
