from django.db import models


class Song(models.Model):
    song_id = models.CharField(max_length=10)

    def __str__(self):
        return self.song_id


class Playlist(models.Model):
    playlist_id = models.CharField(max_length=10)

    def __str__(self):
        return self.playlist_id


class Artist(models.Model):
    artist_id = models.CharField(max_length=10)

    def __str__(self):
        return self.artist_id


class RecentPlay(models.Model):
    song_id = models.CharField(max_length=10)
    playlist_id = models.CharField(max_length=10)
