import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import SongItem from '../../components/SongItem/SongItem';
import SelectItem from '../AlbumDetail/SelectItem';
import { useStore, actions } from '../../store';
import { Link } from 'react-router-dom';

function RecentPlay() {
    const [data, setData] = useState();
    const [state, dispatch] = useStore();

    useEffect(() => {
        getRecentPlay();
    }, []);

    const getRecentPlay = async () => {
        await axios
            .get('/api/recent-play')
            .then((response) => {
                setData(response.songIds);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const loadSongList = () => {
        dispatch(actions.setSongList(data.map((id) => id)));
    };

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
                    <div className="container osx-my-music mar-t-86">
                        <nav className="osx-navbar osx-navbar-wrap">
                            <div className="osx-navbar-container">
                                <h3 className="title">Phát gần đây</h3>
                                <ul className="osx-navbar-menu">
                                    <li className="osx-navbar-item is-active">
                                        <div className="navbar-link">
                                            <Link className="" to="/mymusic/history/song">
                                                Bài hát
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/mymusic/history/song">
                                                Playlist
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/mymusic/history/song">
                                                MV
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/mymusic/history/song">
                                                Radio
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/mymusic/history/song">
                                                Podcast
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        {data ? (
                            <div className="container">
                                <div className="list list-border">
                                    {data.map((id, index) => (
                                        <SelectItem
                                            key={index}
                                            recentPlay={true}
                                            loadSongList={loadSongList}
                                            songId={id}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default RecentPlay;
