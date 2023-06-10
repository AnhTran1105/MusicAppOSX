from django.db import models


class Song(models.Model):
    song_id = models.CharField(max_length=10)

    def __str__(self):
        return self.song_id


class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.email


class Playlist(models.Model):
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.title


class Artist(models.Model):
    artist_id = models.CharField(max_length=10)

    def __str__(self):
        return self.artist_id


class RecentPlay(models.Model):
    song_id = models.CharField(max_length=10)
    # playlist_id = models.CharField(max_length=10)
