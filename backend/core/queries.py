from .models import Song


def save_song(request):
    new_song = Song(song_id='your_song_id')
    new_song.save()
    # Lưu song_id vào cơ sở dữ liệu


def get_songs(request):
    songs = Song.objects.all()
    for song in songs:
        print(song.song_id)
    # Truy vấn và in ra danh sách songId
