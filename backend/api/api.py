import http.cookiejar
import requests
import hashlib
import hmac
import time
import http.cookiejar


class ZingMp3Api:
    def __init__(self, VERSION, URL, SECRET_KEY, API_KEY, CTIME):
        self.VERSION = VERSION
        self.URL = URL
        self.SECRET_KEY = SECRET_KEY
        self.API_KEY = API_KEY
        self.CTIME = CTIME

    def getHash256(self, string):
        hash_object = hashlib.sha256(string.encode('utf-8'))
        return hash_object.hexdigest()

    def getHmac512(self, string, key):
        hmac_object = hmac.new(key.encode(
            'utf-8'), string.encode('utf-8'), hashlib.sha512)
        return hmac_object.hexdigest()

    def hashParamNoId(self, path):
        return self.getHmac512(
            path +
            self.getHash256(f"ctime={self.CTIME}version={self.VERSION}"),
            self.SECRET_KEY
        )

    def hashParam(self, path, song_id):
        return self.getHmac512(
            path +
            self.getHash256(
                f"ctime={self.CTIME}id={song_id}version={self.VERSION}"),
            self.SECRET_KEY
        )

    def hashParamHome(self, path):
        return self.getHmac512(
            path +
            self.getHash256(
                f"count=30ctime={self.CTIME}page=1version={self.VERSION}"),
            self.SECRET_KEY
        )

    def hashCategoryMV(self, path, id, type):
        return self.getHmac512(
            path +
            self.getHash256(
                f"ctime={self.CTIME}id={id}type={type}version={self.VERSION}"),
            self.SECRET_KEY
        )

    def hashListMV(self, path, id, type, page, count):
        return self.getHmac512(
            path + self.getHash256(
                f"count={count}ctime={self.CTIME}id={id}page={page}type={type}version={self.VERSION}"
            ),
            self.SECRET_KEY
        )

    def getCookie(self):
        response = requests.get(self.URL)
        if "set-cookie" in response.headers:
            cookies = response.headers["set-cookie"]
            for index, cookie in enumerate(cookies):
                if index == 1:
                    return cookie
        return None

    def requestZingMp3(self, path, qs):
        cookie_jar = http.cookiejar.CookieJar()
        cookie_processor = http.cookiejar.CookieJar()
        session = requests.Session()
        session.cookies = cookie_jar

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Referer": "https://zingmp3.vn/"
        }
        params = {
            "ctime": self.CTIME,
            "version": self.VERSION,
            "apiKey": self.API_KEY,
            **qs
        }

        # GET request to set the cookie
        session.get("https://zingmp3.vn", headers=headers)

        # GET request with cookie and additional parameters
        response = session.get(self.URL + path, headers=headers, params=params)
        data = response.json()

        if "url" in data:
            second_response = session.get(data["url"])
            return second_response.json()
        else:
            return data

    def getSong(self, song_id):
        return self.requestZingMp3("/api/v2/song/get/streaming", {
            "id": song_id,
            "sig": self.hashParam("/api/v2/song/get/streaming", song_id)
        })

    def getInfoSong(self, songId):
        qs = {
            "id": songId,
            "sig": self.hashParam("/api/v2/song/get/info", songId)
        }
        return self.requestZingMp3("/api/v2/song/get/info", qs)

    def getDetailPlaylist(self, playlist_id):
        return self.requestZingMp3("/api/v2/page/get/playlist", {
            "id": playlist_id,
            "sig": self.hashParam("/api/v2/page/get/playlist", playlist_id)
        })

    def getHome(self):
        qs = {
            "page": 1,
            "segmentId": "-1",
            "count": "30",
            "sig": self.hashParamHome("/api/v2/page/get/home")
        }
        return self.requestZingMp3("/api/v2/page/get/home", qs)

    def getTop100(self):
        qs = {
            "sig": self.hashParamNoId("/api/v2/page/get/top-100")
        }
        return self.requestZingMp3("/api/v2/page/get/top-100", qs)

    def getChartHome(self):
        qs = {
            "sig": self.hashParamNoId("/api/v2/page/get/chart-home")
        }
        return self.requestZingMp3("/api/v2/page/get/chart-home", qs)

    def getNewReleaseChart(self):
        qs = {
            "sig": self.hashParamNoId("/api/v2/page/get/newrelease-chart")
        }
        return self.requestZingMp3("/api/v2/page/get/newrelease-chart", qs)

    def getListArtistSong(self, artistId, page, count):
        qs = {
            "id": artistId,
            "type": "artist",
            "page": page,
            "count": count,
            "sort": "new",
            "sectionId": "aSong",
            "sig": self.hashListMV("/api/v2/song/get/list", artistId, "artist", page, count)
        }
        return self.requestZingMp3("/api/v2/song/get/list", qs)

    def getArtist(self, name):
        qs = {
            "alias": name,
            "sig": self.hashParamNoId("/api/v2/page/get/artist")
        }
        return self.requestZingMp3("/api/v2/page/get/artist", qs)

    def getLyric(self, songId):
        qs = {
            "id": songId,
            "sig": self.hashParam("/api/v2/lyric/get/lyric", songId)
        }
        return self.requestZingMp3("/api/v2/lyric/get/lyric", qs)

    def search(self, name):
        qs = {
            "q": name,
            "sig": self.hashParamNoId("/api/v2/search/multi")
        }
        return self.requestZingMp3("/api/v2/search/multi", qs)

    def getListMV(self, id, page, count):
        qs = {
            "id": id,
            "type": "genre",
            "page": page,
            "count": count,
            "sort": "listen",
            "sig": self.hashListMV("/api/v2/video/get/list", id, "genre", page, count),
        }
        return self.requestZingMp3("/api/v2/video/get/list", qs)

    def getCategoryMV(self, id):
        qs = {
            "id": id,
            "type": "video",
            "sig": self.hashCategoryMV("/api/v2/genre/get/info", id, "video"),
        }
        return self.requestZingMp3("/api/v2/genre/get/info", qs)

    def getVideo(self, videoId):
        qs = {
            "id": videoId,
            "sig": self.hashParam("/api/v2/page/get/video", videoId),
        }
        return self.requestZingMp3("/api/v2/page/get/video", qs)


ZingMp3 = ZingMp3Api(
    "1.6.34",  # VERSION
    "https://zingmp3.vn",  # URL
    "2aa2d1c561e809b267f3638c4a307aab",  # SECRET_KEY
    "88265e23d4284f25963e6eedac8fbfa3",  # API_KEY
    str(int(time.time()))  # CTIME
)
