from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255,unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=255,unique=True)
    is_employee = models.BooleanField(default=False)
    is_hospitalcoordinator = models.BooleanField(default=False)
    is_authen = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name','password']