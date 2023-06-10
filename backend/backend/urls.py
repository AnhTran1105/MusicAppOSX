from django.urls import path
from core import views


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
    path('api/load-song-ids', views.load_song_ids),
    path('api/toggle-favorite', views.toggle_favorite),
    path('api/register', views.register),
    path('api/login', views.login),
    path('api/create-playlist', views.create_playlist),
    path('api/get-all-playlists', views.get_all_playlists),
]
