import requests
from django.http import JsonResponse


def getTrack(request):
    url = "https://spotify23.p.rapidapi.com/tracks/"
    querystring = {"ids": "4WNcduiCmDNfmTEz7JvmLv"}
    headers = {
        "X-RapidAPI-Key": "669b3a58ddmsh6c08f304c816a2fp1be6dbjsn6a0d15230b08",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    data = response.json()

    return JsonResponse(data, safe=False)


def getPlaylistTracks(request):
    url = "https://spotify23.p.rapidapi.com/playlist_tracks/"

    querystring = {"id": "37i9dQZF1DX4Wsb4d7NKfP",
                   "offset": "0", "limit": "100"}

    headers = {
        "X-RapidAPI-Key": "669b3a58ddmsh6c08f304c816a2fp1be6dbjsn6a0d15230b08",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    data = response.json()

    return JsonResponse(data, safe=False)
