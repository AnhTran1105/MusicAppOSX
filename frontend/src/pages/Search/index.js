import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import SongItem from '../../components/SongItem/SongItem';
import Playlist from '../../sections/Playlist';
import Artist from '../../sections/Artist';
import MV from '../../sections/MV';

function Search() {
    const location = useLocation();
    const [isBusy, setBusy] = useState(true);
    const [data, setData] = useState();
    const searchParams = new URLSearchParams(location.search);
    const type = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
    const keyword = searchParams.get('q');

    useEffect(() => {
        if (keyword) {
            (async () => {
                try {
                    setData(await search(keyword));
                    setBusy(false);
                } catch (error) {
                    console.error('Error fetching song info and song source:', error);
                }
            })();
        }
    }, [keyword]);

    const search = async (keyword) => {
        try {
            const response = await axios.get(`search/?keyword=${keyword}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    if (isBusy) return null;

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
                    <div className="container">
                        <nav className="osx-navbar osx-search-narbar osx-navbar-wrap">
                            <div className="osx-navbar-container">
                                <h3 className="title">Kết Quả Tìm Kiếm</h3>
                                <ul className="osx-navbar-menu">
                                    <li className="osx-navbar-item is-active">
                                        <div className="navbar-link">
                                            <Link className="" to="/tim-kiem/tat-ca?q=sontungmtp">
                                                Tất cả
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/tim-kiem/bai-hat?q=sontungmtp">
                                                Bài hát
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/tim-kiem/playlist?q=sontungmtp">
                                                Playlist/Album
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/tim-kiem/artist?q=sontungmtp">
                                                Nghệ sĩ/OA
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <Link className="" to="/tim-kiem/video?q=sontungmtp">
                                                MV
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="container page-search">
                            {/* <div>
                                <div className="osx-section osx-featured-search-section">
                                    <div className="container">
                                        <h3 className="osx-section-title title is-2">Nổi bật</h3>
                                        <div className="osx-carousel-wrapper">
                                            <div className="osx-carousel">
                                                <div
                                                    className="osx-carousel__container"
                                                    style={{ transform: 'translate3d(0px, 0px, 0px)' }}
                                                >
                                                    <div className="osx-carousel-item is-fullhd-4 is-widescreen-4 is-desktop-4 is-touch-4 is-tablet-4">
                                                        <div className="list-item osx-featured-song full-left media-item hide-right">
                                                            <div className="media">
                                                                <div className="media-left">
                                                                    <div className="song-thumb">
                                                                        <figure
                                                                            className="image is-84x84"
                                                                            title="Thái Bình Mồ Hôi Rơi (Extended Mix)"
                                                                        >
                                                                            <img
                                                                                src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"
                                                                                alt=""
                                                                            />
                                                                        </figure>
                                                                        <div className="opacity "></div>
                                                                        <div className="osx-actions-container">
                                                                            <div className="osx-box osx-actions">
                                                                                <span className="is-hidden">
                                                                                    <button
                                                                                        className="osx-btn osx-tooltip-btn is-hidden is-hover-circle button"
                                                                                        tabIndex="0"
                                                                                    >
                                                                                        <i className="icon ic-like"></i>
                                                                                    </button>
                                                                                </span>
                                                                                <button
                                                                                    className="osx-btn action-play  button"
                                                                                    tabIndex="0"
                                                                                >
                                                                                    <i className="icon action-play ic-play"></i>
                                                                                </button>
                                                                                <button
                                                                                    className="osx-btn osx-tooltip-btn is-hidden is-hover-circle button"
                                                                                    tabIndex="0"
                                                                                >
                                                                                    <i className="icon ic-more"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-info">
                                                                        <p className="type">Bài hát</p>
                                                                        <div className="title-wrapper">
                                                                            <span className="item-title title">
                                                                                <span>
                                                                                    <span>
                                                                                        <span>
                                                                                            Thái Bình Mồ Hôi Rơi
                                                                                            (Extended
                                                                                        </span>
                                                                                        <br></br>
                                                                                        <span>Mix)</span>
                                                                                    </span>
                                                                                    <span
                                                                                        style={{
                                                                                            position: 'fixed',
                                                                                            visibility: 'hidden',
                                                                                            top: '0px',
                                                                                            left: '0px',
                                                                                        }}
                                                                                    >
                                                                                        …
                                                                                    </span>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <h3 className="is-one-line is-truncate subtitle">
                                                                            <span className="artist-names">
                                                                                <span>SonTungMTP</span>
                                                                            </span>
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div className="media-right left-only">
                                                                    <div className="hover-items">
                                                                        <div className="level">
                                                                            <div className="level-item"></div>
                                                                            <div className="level-item"></div>
                                                                            <div className="level-item">
                                                                                <span>
                                                                                    <button
                                                                                        className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                                        tabIndex="0"
                                                                                    >
                                                                                        <i className="icon ic-like"></i>
                                                                                    </button>
                                                                                </span>
                                                                            </div>
                                                                            <div className="level-item">
                                                                                <button
                                                                                    className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                                    tabIndex="0"
                                                                                >
                                                                                    <i className="icon ic-more"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="action-items">
                                                                        <div className="level">
                                                                            <div className="level-item">
                                                                                <span>
                                                                                    <button
                                                                                        className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                                        tabIndex="0"
                                                                                    >
                                                                                        <i className="icon ic-like"></i>
                                                                                    </button>
                                                                                </span>
                                                                            </div>
                                                                            <div className="level-item duration">
                                                                                06:47
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="osx-btn osx-carousel-control-prev osx-disabled is-hide button"
                                                tabIndex="0"
                                            >
                                                <i className="icon ic-go-left"></i>
                                            </button>
                                            <button
                                                className="osx-btn osx-carousel-control-next osx-disabled is-hide button"
                                                tabIndex="0"
                                            >
                                                <i className="icon ic-go-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="container mar-t-30">
                                <h3 className="osx-section-title title is-2">
                                    Bài Hát
                                    <a className="discovery-btn" href="/tim-kiem/bai-hat?q=sontungmtp">
                                        Tất cả <i className="icon ic-go-right"></i>
                                    </a>
                                </h3>
                                <div className="columns is-multiline">
                                    {[...Array(2)].map((_, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className="column mar-b-0 is-fullhd-6 is-widescreen-6 is-desktop-6 is-touch-6 is-tablet-6"
                                        >
                                            <div className="list list-border">
                                                {data.songs
                                                    .slice(0, 6)
                                                    .filter((_, index) => index % 2 === colIndex)
                                                    .map((item, i) => (
                                                        <div
                                                            key={i}
                                                            className="list-item media-item hide-right full-left"
                                                        >
                                                            <SongItem props={item} />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {data.playlists ? (
                                <Playlist
                                    props={data.playlists}
                                    sectionTitle="Playlist/Album"
                                    sectionLink={`/tim-kiem/bai-hat?q=${keyword}`}
                                    cardTitle={true}
                                />
                            ) : (
                                ''
                            )}
                            {data.videos ? (
                                <MV
                                    props={data.videos}
                                    sectionTitle="MV"
                                    sectionLink={`/tim-kiem/playlist?q=${keyword}`}
                                    cardTitle={true}
                                />
                            ) : (
                                ''
                            )}
                            {data.artists ? (
                                <Artist
                                    props={data.artists}
                                    cardTitle={true}
                                    artistSection={true}
                                    sectionTitle="Nghệ Sĩ/OA"
                                    sectionLink={`/tim-kiem/artist?q=${keyword}`}
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Search;
