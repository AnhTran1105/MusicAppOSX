from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class Artist (models.Model):
    name = models.CharField(max_length = 250)
    country = models.CharField(max_length = 150)
    birth_year = models.IntegerField()
    genre = models.CharField(max_length = 150)

class Song(models.Model):
    Title = models.CharField(max_length = 250)
    release_date = models.IntegerField()
    length = models.DateField()
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE)

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
    
class Playlist(models.Model):
    title = models.CharField(max_length=100)
    songs = models.ManyToManyField(Song)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)