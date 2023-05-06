from django.urls import path
from core import views

urlpatterns = [
    path('track/', views.getTrack, name='track'),
    path('playlist_tracks/', views.getPlaylistTracks, name='playlist_tracks'),
]
