import { Link } from 'react-router-dom';
import ToolTip from '@tippyjs/react';
import SelectItem from '../AlbumDetail/SelectItem';
import axios from '../../utils/axios';
import { useStore, actions } from '../../store';
import { useState, useEffect } from 'react';
import usePortal from 'react-cool-portal';

function Library() {
    const { Portal, show, hide } = usePortal({
        defaultShow: false,
    });

    const [playlistTitle, setPlaylistTitle] = useState('');

    const [data, setData] = useState(null);
    const [isBusy, setBusy] = useState(true);

    const [state, dispatch] = useStore();

    useEffect(() => {
        (async () => {
            try {
                setData(await getSongIds());
                setBusy(false);
            } catch (error) {
                console.error('Error fetching song info and song source:', error);
            }
        })();
    }, []);

    const getSongIds = async () => {
        try {
            const response = await axios.get('api/load-song-ids');
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const loadSongList = () => {
        dispatch(actions.setSongList(data.songIds.map((id) => id)));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        create(playlistTitle);
    };

    const create = () => {
        axios
            .post(
                '/api/create-playlist',
                { title: playlistTitle },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                alert(response.message);
                // if (response.success) {
                //     dispatch(actions.setLoggedIn(true));
                //     navigate('/');
                // } else setError(response.message);
            })
            .catch((error) => {
                console.error(error);
            });
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
                    <div className="container osx-my-music">
                        <div className="container mymusic-overview">
                            <div style={{ position: 'relative' }}>
                                <div className="header">
                                    <div className="text">Thư viện</div>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon">
                                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                                                <g filter="url(#filter0_d_3141_46346)">
                                                    <circle cx="22" cy="21" r="18" fill="#FEFFFF"></circle>
                                                </g>
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z"
                                                    fill="#141414"
                                                ></path>
                                                <defs>
                                                    <filter
                                                        id="filter0_d_3141_46346"
                                                        x="0"
                                                        y="0"
                                                        width="44"
                                                        height="44"
                                                        filterUnits="userSpaceOnUse"
                                                        colorInterpolationFilters="sRGB"
                                                    >
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                        <feColorMatrix
                                                            in="SourceAlpha"
                                                            type="matrix"
                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                            result="hardAlpha"
                                                        ></feColorMatrix>
                                                        <feOffset dy="1"></feOffset>
                                                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                                        <feColorMatrix
                                                            type="matrix"
                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                                                        ></feColorMatrix>
                                                        <feBlend
                                                            mode="normal"
                                                            in2="BackgroundImageFix"
                                                            result="effect1_dropShadow_3141_46346"
                                                        ></feBlend>
                                                        <feBlend
                                                            mode="normal"
                                                            in="SourceGraphic"
                                                            in2="effect1_dropShadow_3141_46346"
                                                            result="shape"
                                                        ></feBlend>
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </i>
                                    </button>
                                </div>
                                <div className="osx-section channel-section">
                                    <div className="container">
                                        <h3 className="osx-section-title title is-2">
                                            <div>
                                                PLAYLIST{' '}
                                                <button
                                                    className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                    tabIndex="0"
                                                    onClick={show}
                                                    style={{ backgroundColor: 'var(--alpha-bg)' }}
                                                >
                                                    <i className="icon ic-add"></i>
                                                </button>
                                            </div>
                                        </h3>
                                        <div className="osx-carousel-wrapper">
                                            <div className="osx-carousel">
                                                <div
                                                    className="osx-carousel__container"
                                                    style={{ transform: 'translate3d(0px, 0px, 0px)' }}
                                                >
                                                    <div className="osx-carousel-item is-fullhd-20 is-widescreen-20 is-desktop-3 is-touch-3 is-tablet-3">
                                                        <div className="library-playlist-item">
                                                            <div className="osx-card">
                                                                <Link className="" title="Untitled" to="/mymusic">
                                                                    <div className="osx-card-image">
                                                                        <div className="osx-actions-container">
                                                                            <div className="osx-box osx-actions playlist-actions">
                                                                                <ToolTip content="Xóa">
                                                                                    <button
                                                                                        className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                                        tabIndex="0"
                                                                                    >
                                                                                        <i className="icon ic-close"></i>
                                                                                    </button>
                                                                                </ToolTip>
                                                                                <button
                                                                                    className="osx-btn action-play  button"
                                                                                    tabIndex="0"
                                                                                >
                                                                                    <i className="icon action-play ic-svg-play-circle"></i>
                                                                                </button>
                                                                                <ToolTip content="Khác">
                                                                                    <button
                                                                                        className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                                        tabIndex="0"
                                                                                    >
                                                                                        <i className="icon ic-more"></i>
                                                                                    </button>
                                                                                </ToolTip>
                                                                            </div>
                                                                        </div>
                                                                        <figure className="image is-48x48">
                                                                            <img
                                                                                src="https://photo-playlist-zmp3.zmdcdn.me/s2/user-playlist?src=HavwqN7EvKCI1og5AfZbHm1SSjXgcELR0aLvscsPuWa7GtkCFPwn154GAOqxoB08MqKgtc6VsryCGaNRPfpQN0vP7fmma9mE1H9SrMZRo4TINn2IUPkF3HTV6P9ucuOL6KOPnYRCWaHE54t19Pk251z2Jv5pdz0H6n8SbN38d4zPH13J8iFN3H0RMuThavf1LmeRm27KcX5N31kGEuQ6GWHTJf0_ZjH605rCb6o3sXK3K4QHEztT5507IufZd88O5bL0mI7Lt5D2716CRPBD4mLMKemzaieJLKW5bJ-QdX1GGrIIRChCHmmKKiSnpyjE3XnSoMAHmKiL41-S8dq&amp;size=thumb/240_240"
                                                                                alt=""
                                                                            />
                                                                        </figure>
                                                                        <div className="opacity "></div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="osx-card-content">
                                                                <h4 className="title is-6">
                                                                    <Link className="" title="Untitled" to="/mymusic">
                                                                        <span>
                                                                            <span>
                                                                                <span>Untitled</span>
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
                                                                    </Link>
                                                                </h4>
                                                                <h3 className="mt-10 subtitle">Anh Trần</h3>
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
                                                className="osx-btn osx-carousel-control-prev osx-disabled is-hide button"
                                                tabIndex="0"
                                            >
                                                <i className="icon ic-go-left"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-section">
                                    <nav className="osx-navbar mar-t-30 osx-navbar-wrap">
                                        <div className="osx-narbar-container">
                                            <ul className="osx-navbar-menu">
                                                <li className="osx-navbar-item is-active">
                                                    <div className="navbar-link">
                                                        <Link className="" to="/mymusic">
                                                            BÀI HÁT
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="osx-navbar-item">
                                                    <div className="navbar-link">
                                                        <Link
                                                            style={{ pointerEvents: 'none' }}
                                                            className=""
                                                            to="/mymusic/podcast"
                                                        >
                                                            PODCAST
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="osx-navbar-item">
                                                    <div className="navbar-link">
                                                        <Link
                                                            style={{ pointerEvents: 'none' }}
                                                            className=""
                                                            to="/mymusic/album"
                                                        >
                                                            ALBUM
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="osx-navbar-item">
                                                    <div className="navbar-link">
                                                        <Link
                                                            style={{ pointerEvents: 'none' }}
                                                            className=""
                                                            to="/mymusic/mv"
                                                        >
                                                            MV
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                    <div>
                                        <div className="osx-nav-buttons mar-b-20">
                                            <Link
                                                style={{ pointerEvents: 'none' }}
                                                className="item active"
                                                to="/mymusic/song/favorite"
                                            >
                                                Yêu thích
                                            </Link>
                                            <Link
                                                style={{ pointerEvents: 'none' }}
                                                className="item"
                                                to="/mymusic/song/upload"
                                            >
                                                Đã tải lên
                                            </Link>
                                        </div>
                                        <div className="osx-library-song">
                                            <div className="list list-border song-list-select">
                                                <div className="media select-header">
                                                    <div className="media-left">
                                                        <div className="sort-wrapper">
                                                            <div className="osx-dropdown osx-group-dropdown mar-r-10 is-hidden">
                                                                <div className="osx-dropdown-trigger-btn">
                                                                    <button className="osx-btn button" tabIndex="0">
                                                                        <i className="icon ic-24-Sort"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="osx-dropdown-content">
                                                                    <div className="osx-dropdown-list-item">
                                                                        Mặc định
                                                                    </div>
                                                                    <div className="osx-dropdown-list-item">
                                                                        Tên bài hát (A-Z)
                                                                    </div>
                                                                    <div className="osx-dropdown-list-item">
                                                                        Tên ca sĩ (A-Z)
                                                                    </div>
                                                                    <div className="osx-dropdown-list-item">
                                                                        Tên Album (A-Z)
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="column-text">Bài hát</div>
                                                        </div>
                                                    </div>
                                                    <div className="media-content">
                                                        <div className="column-text mar-l-10">Album</div>
                                                    </div>
                                                    <div className="media-right">
                                                        <div className="column-text"> Thời gian</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {data.songIds.map((id) => (
                                                        <SelectItem loadSongList={loadSongList} key={id} songId={id} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Portal>
                <div className="osx-portal-modal">
                    <div className="modal is-active">
                        <div role="presentation" className="modal-background">
                            <div className="modal-content">
                                <div className="form-playlist-content">
                                    <ToolTip content="Đóng">
                                        <button
                                            onClick={hide}
                                            className="osx-btn osx-tooltip-btn close-btn is-hover-circle button"
                                            tabIndex="0"
                                        >
                                            <i className="icon ic-close"></i>
                                        </button>
                                    </ToolTip>
                                    <h3 className="title">Tạo playlist mới</h3>
                                    <form>
                                        <input
                                            className="input"
                                            placeholder="Nhập tên playlist"
                                            value={playlistTitle}
                                            onChange={(e) => setPlaylistTitle(e.target.value)}
                                        />
                                        <p>
                                            <button
                                                className="osx-btn mar-t-20 is-outlined active is-fullwidth is-upper button"
                                                tabIndex="-1"
                                                disabled=""
                                            >
                                                <i className="icon"></i>
                                                <span>Tạo mới</span>
                                            </button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        </div>
    );
}

export default Library;
