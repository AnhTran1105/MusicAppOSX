from django.urls import path
from core import views

urlpatterns = [
    path('spotify-data/', views.get_spotify_data, name='spotify-data'),
]
