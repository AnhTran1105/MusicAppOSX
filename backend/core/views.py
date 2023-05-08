from api.controller import zing_controller


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
