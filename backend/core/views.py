from api.controller import zing_controller
from django.http import JsonResponse
from .models import Song
import json
from django.views.decorators.csrf import csrf_exempt


def get_song(request):
    data = zing_controller.getSong(request)
    return data


def get_detail_playlist(request):
    data = zing_controller.getDetailPlaylist(request)
    return data


def get_home(request):
    data = zing_controller.getHome(request)
    return data


def get_top100(request):
    data = zing_controller.getTop100(request)
    return data


def get_chart_home(request):
    data = zing_controller.getChartHome(request)
    return data


def get_new_release_chart(request):
    data = zing_controller.getNewReleaseChart(request)
    return data


def get_info_song(request):
    data = zing_controller.getInfoSong(request)
    return data


def get_artist(request):
    data = zing_controller.getArtist(request)
    return data


def get_artist_song(request):
    data = zing_controller.getArtistSong(request)
    return data


def get_lyric(request):
    data = zing_controller.getLyric(request)
    return data


def get_lyric(request):
    data = zing_controller.getLyric(request)
    return data


def search(request):
    data = zing_controller.search(request)
    return data


def get_list_mv(request):
    data = zing_controller.getListMV(request)
    return data


def get_category_mv(request):
    data = zing_controller.getCategoryMV(request)
    return data


def get_video(request):
    data = zing_controller.getVideo(request)
    return data


@csrf_exempt
def toggle_favorite(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        song_id = data.get('song_id')
        # Kiểm tra xem bài hát đã tồn tại trong cơ sở dữ liệu hay chưa
        if Song.objects.filter(song_id=song_id):
            Song.objects.filter(song_id=song_id).delete()
            # Nếu tồn tại, xóa bài hát khỏi cơ sở dữ liệu
            return JsonResponse({'success': True, 'message': 'Removed from favorites'})
        else:
            # Nếu không tồn tại, thêm bài hát vào cơ sở dữ liệu
            Song.objects.create(song_id=song_id)
            return JsonResponse({'success': True, 'message': 'Added to favorites'})
    return JsonResponse({'success': False, 'message': 'Invalid request'})


def load_song_ids(request):
    if request.method == 'GET':
        song_ids = Song.objects.values_list('song_id', flat=True)
        return JsonResponse({'data': {'songIds': list(song_ids)}})
    else:
        return JsonResponse({'error': 'Invalid request method'})
