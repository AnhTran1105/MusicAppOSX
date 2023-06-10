import SongItem from '../../components/SongItem/SongItem';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useStore, actions } from '../../store';

function ArtistSong() {
    const [data, setData] = useState();
    const [artist, setArtist] = useState();
    const [isBusy, setBusy] = useState(true);
    const { alias } = useParams();
    const [state, dispatch] = useStore();

    useEffect(() => {
        let requestCount = 0;

        const fetchData = async () => {
            try {
                const artistResponse = await getArtist(alias);
                setArtist(artistResponse);
                requestCount++;

                const dataResponse = await getArtistSong(artistResponse.id, 1, 15);
                setData(dataResponse);
                requestCount++;

                if (requestCount === 2) {
                    setBusy(false);
                }
            } catch (error) {
                console.error('Error fetching song info and song source:', error);
            }
        };

        fetchData();
    }, [alias]);

    const getArtistSong = async (artistId, page, count) => {
        try {
            const response = await axios.get(`get-artist-song/?id=${artistId}&page=${page}&count=${count}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const getArtist = async (alias) => {
        try {
            const response = await axios.get(`get-artist/?name=${alias}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const loadSongList = () => {
        dispatch(actions.setSongList(data.items.map((item) => item.encodeId)));
    };

    if (isBusy) {
        return null;
    }

    const header = document.querySelector('.osx-header');
    header.setAttribute('style', '--sticky-header-box-shadow: transparent');

    return (
        <div className="osx-box osx-mainpage">
            <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
                <main
                    className="osx-section"
                    id="body-scroll"
                    style={{
                        position: 'absolute',
                        inset: '0px',
                        overflow: 'hidden scroll',
                        marginRight: '-6px',
                        marginBottom: '0px',
                    }}
                >
                    <div className="container mar-b-30">
                        <div className="artist-song">
                            <div className={`container artist-tab-title mar-b-5 is-sticky`}>
                                <div className="is-center">
                                    <h3 className="mar-b-0 mar-r-10 title">
                                        <span>{artist.name}</span> - Tất cả bài hát
                                    </h3>
                                    <button
                                        className="osx-btn play-btn is-outlined active is-upper is-small button"
                                        tabIndex="0"
                                    >
                                        <i className="icon ic-play"></i>
                                    </button>
                                </div>
                                <div className="osx-dropdown">
                                    <div className="osx-dropdown-trigger">
                                        <i className="icon mar-r-10 ic-sort"></i>
                                        <button className="osx-btn dropdown-button button" tabIndex="0">
                                            <span className="dropdown-name">Mới nhất</span>
                                            <i className="icon ic-go-down"></i>
                                        </button>
                                    </div>
                                    <div className="osx-dropdown-content">
                                        <div className="osx-dropdown-list-item">Nổi bật</div>
                                        <div className="osx-dropdown-list-item">Mới nhất</div>
                                    </div>
                                </div>
                            </div>
                            <div className="list list-border">
                                {data.items.map((item, i) => (
                                    <div key={i} className="list-item media-item hide-right">
                                        <SongItem props={item} isContent={true} loadSongList={loadSongList} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ArtistSong;
