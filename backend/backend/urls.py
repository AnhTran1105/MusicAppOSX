# from django.urls import path
# from core import views

# urlpatterns = [
#     path('track/', views.getTrack, name='track'),
#     path('playlist_tracks/', views.getPlaylistTracks, name='playlist_tracks'),
# ]

from django.urls import path
from core import views
from song.views import register, login
from song.views import create_playlist, playlist_detail

urlpatterns = [
    path('get-song/', views.get_song),
    path('get-detail-playlist/', views.get_detail_playlist),
    path('get-home/', views.get_home),
    path('get-top100/', views.get_top100),
    path('get-chart-home/', views.get_chart_home),
    path('get-new-release-chart/', views.get_new_release_chart),
    path('get-info-song/', views.get_info_song),
    path('get-artist/', views.get_artist),
    path('get-artist-song/', views.get_artist_song),
    path('get-lyric/', views.get_lyric),
    path('search/', views.search),
    path('get-list-mv/', views.get_list_mv),
    path('get-category-mv/', views.get_category_mv),
    path('get-video/', views.get_video),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('playlist/create/', create_playlist, name='create_playlist'),
    path('playlist/<int:playlist_id>/', playlist_detail, name='playlist_detail'),
]
