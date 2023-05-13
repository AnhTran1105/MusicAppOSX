from api.api import ZingMp3
from django.http import JsonResponse


class ZingController:
    def getSong(self, req):
        song_id = req.GET.get('id')
        data = ZingMp3.getSong(song_id)
        return JsonResponse(data)

    def getDetailPlaylist(self, req):
        data = ZingMp3.getDetailPlaylist(req.GET['id'])
        return JsonResponse(data)

    def getHome(self, req):
        data = ZingMp3.getHome()
        return JsonResponse(data, safe=False)

    def getTop100(self, req):
        data = ZingMp3.getTop100()
        return JsonResponse(data)

    def getChartHome(self, req):
        data = ZingMp3.getChartHome()
        return JsonResponse(data)

    def getNewReleaseChart(self, req):
        data = ZingMp3.getNewReleaseChart()
        return JsonResponse(data)

    def getInfoSong(self, req):
        song_id = req.GET.get('id')
        data = ZingMp3.getInfoSong(song_id)
        return JsonResponse(data)

    def getArtist(self, req):
        artist_name = req.GET.get('name')
        data = ZingMp3.getArtist(artist_name)
        return JsonResponse(data)

    def getArtistSong(self, req):
        data = ZingMp3.getListArtistSong(
            req.GET['id'], req.GET['page'], req.GET['count'])
        return JsonResponse(data)

    def getLyric(self, req):
        song_id = req.GET.get('id')
        data = ZingMp3.getLyric(song_id)
        return JsonResponse(data)

    def search(self, req):
        data = ZingMp3.search(req.GET['keyword'])
        return JsonResponse(data)

    def getListMV(self, req):
        data = ZingMp3.getListMV(
            req.GET['id'], req.GET['page'], req.GET['count'])
        return JsonResponse(data)

    def getCategoryMV(self, req):
        data = ZingMp3.getCategoryMV(req.GET['id'])
        return JsonResponse(data)

    def getVideo(self, req):
        data = ZingMp3.getVideo(req.GET['id'])
        return JsonResponse(data)


zing_controller = ZingController()
