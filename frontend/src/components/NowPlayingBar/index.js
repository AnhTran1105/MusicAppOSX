/* eslint-disable jsx-a11y/anchor-is-valid */
import { KaraokeIcon, VolumeDownIcon, VolumeOffIcon } from '../../icons';
import { useState, useEffect, useRef } from 'react';
import ToolTip from '@tippyjs/react';
import SongController from '../SongController';
import { useStore } from '../../store';
import axios from '../../utils/axios';
import Skeleton from 'react-loading-skeleton';
import { Fragment } from 'react';
import Lyrics from './Lyrics';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import formatNumber from '../../utils/formatNumber';
import FavouriteButton from '../FavouriteButton';

let audio;
function NowPlayingBar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeating, setRepeating] = useState(false);
    const [isShuffling, setShuffling] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const nowplayingbarRef = useRef();
    const playerControlsRef = useRef();
    const progressBarRef = useRef(null);
    const [songData, setSongData] = useState(null);
    const [songSrc, setSongSrc] = useState(null);
    const [isBusy, setBusy] = useState(true);
    const [lyricsShowing, setLyricsShowing] = useState(false);
    const [lyrics, setLyrics] = useState(null);
    const [infoMenuVisible, setInfoMenuVisible] = useState('hidden');
    const [subMenuVisible, setSubMenuVisible] = useState('hidden');
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [songId, setSongId] = useState(null);
    const [songStore, setSongStore] = useState([]);

    const [state, dispatch] = useStore();

    const songList = state.songList;

    useEffect(() => {
        if (songId) {
            (async () => {
                try {
                    audio = document.querySelector('.--z--player audio');
                    const data = await getInfoSong(songId);
                    const src = await getSong(songId);
                    setLyrics(await getLyrics(songId));
                    if (src) {
                        audio.setAttribute('src', src[128]);
                    } else {
                        loadNextSong();
                    }
                    setIsPlaying(true);
                    audio.play();
                    setSongData(data);
                    setSongSrc(src);
                    saveRecentSong(songId);
                    setBusy(false);
                } catch (error) {
                    console.error('Error fetching song info and song source:', error);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songId]);

    useEffect(() => {
        setSongId(state.songId);
    }, [state.songId]);

    useEffect(() => {
        setSongStore(songList.slice(0, songList.indexOf(state.songId)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songList]);

    const getSong = async (songId) => {
        try {
            const response = await axios.get(`get-song/?id=${songId}`);
            return response;
            // Xử lý dữ liệu nhận được từ server ở đây
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    };

    const getInfoSong = async (songId) => {
        try {
            const response = await axios.get(`get-info-song/?id=${songId}`);
            return response;
            // Xử lý dữ liệu nhận được từ server ở đây
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    };

    const getLyrics = async (id) => {
        try {
            const data = await axios.get('get-lyric/', {
                params: {
                    id: id,
                },
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!isBusy) {
            audio.ontimeupdate = () => {
                setCurrentTime(audio.currentTime);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBusy]);

    const saveRecentSong = async (songId) => {
        await axios
            .post('/api/save-recent-song', { song_id: songId })
            .then((response) => {})
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleSeek = (event) => {
        const seekPositionX = event.clientX;

        const progressBarX = event.target.getBoundingClientRect().left;

        const newVolume = (seekPositionX - progressBarX) / event.target.offsetWidth;

        setVolume(newVolume);

        audio.volume = newVolume;
    };

    const handleNext = () => {
        const index = songList.indexOf(songId);
        if (!isShuffling) {
            if (index < songList.length - 1) {
                setSongId(songList[index + 1]);
            } else {
                setSongId(songList[0]);
            }
        } else {
            setSongId(getRandomElement(songList, songList[index]));
        }
        songStore.push(songId);
    };

    const handlePrevious = () => {
        setSongId(songStore[songStore.length - 1]);
        songStore.pop();
        if (songStore.length === 0) {
            const previousBtn = document.querySelector('.player-controls__player-bar.level-center .btn-pre');
            previousBtn.classList.add('disabled');
        }
    };

    const loadNextSong = () => {
        if (!isRepeating) {
            const index = songList.indexOf(songId);
            if (!isShuffling) {
                setSongId(songList[index + 1]);
            } else {
                setSongId(getRandomElement(songList, songList[index]));
            }
        } else {
            audio.currentTime = 0;
            audio.play();
        }
    };

    const getRandomElement = (array, currentElement) => {
        let randomElement = null;

        while (!randomElement || randomElement === currentElement) {
            randomElement = array[Math.floor(Math.random() * array.length)];
        }

        return randomElement;
    };

    // Xử lý sự kiện khi tua bài hát

    const changeLyricsShowing = () => {
        setLyricsShowing(false);
    };

    if (isBusy) {
        return null;
    } else {
        document.querySelector('.osx-layout').classList.add('has-player');

        audio.onended = () => {
            loadNextSong();
            songStore.push(songId);
        };

        return (
            <div className="now-playing-bar" ref={nowplayingbarRef}>
                {!lyricsShowing ? null : (
                    <Lyrics
                        lyrics={lyrics}
                        title={songData.title}
                        artists={songData.artists}
                        thumbnail={songData.thumbnailM}
                        onLyricsShowing={changeLyricsShowing}
                        nowplayingbarRef={nowplayingbarRef}
                        playerControlsRef={playerControlsRef}
                    />
                )}
                <div ref={playerControlsRef} className="player-controls clickable">
                    <div className="level player-controls__container">
                        <div className="player-controls-left level-left">
                            <div className="media">
                                <div className="media-left">
                                    <a className="" href="/">
                                        <div className="thumbnail-wrapper">
                                            <div className="thumbnail">
                                                <figure className="image">
                                                    {songData ? <img src={songData.thumbnailM} alt="" /> : <Skeleton />}
                                                </figure>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="media-content">
                                    <div className="is-mark level-left">
                                        <div className="song-info-wrapper">
                                            <span className="song-title-item">
                                                <a className="" href={songData ? songData.link : ''}>
                                                    <div className="title-wrapper">
                                                        <span className="item-title title">
                                                            {songData ? songData.title : <Skeleton />}
                                                        </span>
                                                    </div>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="is-one-line is-truncate subtitle">
                                        {songData ? (
                                            songData.artists.map((artist, i) =>
                                                i === songData.artists.length - 1 ? (
                                                    <Link key={i} className="is-ghost" to={artist.link}>
                                                        {artist.name}
                                                    </Link>
                                                ) : (
                                                    <Fragment key={i}>
                                                        <Link className="is-ghost" to={artist.link}>
                                                            {artist.name}
                                                        </Link>
                                                        ,{' '}
                                                    </Fragment>
                                                ),
                                            )
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </h3>
                                </div>
                                <div className="media-right">
                                    <div className="level">
                                        <div className="level-item">
                                            <FavouriteButton songId={songId} />
                                        </div>
                                        <div>
                                            <Tippy
                                                offset={[-20, 340]}
                                                interactive
                                                onClickOutside={() => setInfoMenuVisible('hidden')}
                                                visible
                                                render={(attrs) => (
                                                    <div
                                                        {...attrs}
                                                        className="osx-contextmenu song-menu"
                                                        style={{ visibility: `${infoMenuVisible}` }}
                                                    >
                                                        <div className="menu">
                                                            <div>
                                                                <Tippy
                                                                    offset={[150, 0]}
                                                                    interactive
                                                                    render={(attrs) => (
                                                                        <div
                                                                            {...attrs}
                                                                            className="submenu-content"
                                                                            style={{
                                                                                padding: '0',
                                                                                visibility: `${subMenuVisible}`,
                                                                            }}
                                                                        >
                                                                            <div className="song-info-submenu">
                                                                                <div className="item">
                                                                                    <h3 className="subtitle">
                                                                                        Nghệ sĩ
                                                                                    </h3>
                                                                                    <div className="content">
                                                                                        {songData.artists.map(
                                                                                            (artist, i) =>
                                                                                                i ===
                                                                                                songData.artists
                                                                                                    .length -
                                                                                                    1 ? (
                                                                                                    <a
                                                                                                        key={i}
                                                                                                        className="is-ghost"
                                                                                                        href={
                                                                                                            artist.link
                                                                                                        }
                                                                                                    >
                                                                                                        {artist.name}
                                                                                                    </a>
                                                                                                ) : (
                                                                                                    <Fragment key={i}>
                                                                                                        <a
                                                                                                            className="is-ghost"
                                                                                                            href={
                                                                                                                artist.link
                                                                                                            }
                                                                                                        >
                                                                                                            {
                                                                                                                artist.name
                                                                                                            }
                                                                                                        </a>
                                                                                                        ,{' '}
                                                                                                    </Fragment>
                                                                                                ),
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="item">
                                                                                    <h3 className="subtitle">Album</h3>
                                                                                    <div className="content">
                                                                                        <a
                                                                                            className=""
                                                                                            href={
                                                                                                songData.album
                                                                                                    ? songData.album
                                                                                                          .link
                                                                                                    : ''
                                                                                            }
                                                                                        >
                                                                                            {songData.album
                                                                                                ? songData.album.title
                                                                                                : ''}
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="item">
                                                                                    <h3 className="subtitle">
                                                                                        Thể loại
                                                                                    </h3>
                                                                                    <div className="content">
                                                                                        {songData.genres.map(
                                                                                            (genre, i) =>
                                                                                                i ===
                                                                                                songData.genres.length -
                                                                                                    1 ? (
                                                                                                    <a
                                                                                                        key={i}
                                                                                                        className=""
                                                                                                        href={
                                                                                                            genre.link
                                                                                                        }
                                                                                                        title={
                                                                                                            genre.name
                                                                                                        }
                                                                                                    >
                                                                                                        {genre.name}
                                                                                                    </a>
                                                                                                ) : (
                                                                                                    <Fragment key={i}>
                                                                                                        <a
                                                                                                            className=""
                                                                                                            href={
                                                                                                                genre.link
                                                                                                            }
                                                                                                            title={
                                                                                                                genre.name
                                                                                                            }
                                                                                                        >
                                                                                                            {genre.name}
                                                                                                        </a>
                                                                                                        ,{' '}
                                                                                                    </Fragment>
                                                                                                ),
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                >
                                                                    <ul
                                                                        onMouseOver={() => setSubMenuVisible('visible')}
                                                                        className="menu-list"
                                                                    >
                                                                        <div className="menu-list--submenu">
                                                                            <div className="media song-info-menu">
                                                                                <div className="media-left">
                                                                                    <figure className="image is-40x40">
                                                                                        <img
                                                                                            src={songData.thumbnail}
                                                                                            alt=""
                                                                                        />
                                                                                    </figure>
                                                                                </div>
                                                                                <div className="is-w-150 media-content">
                                                                                    <a>
                                                                                        <div className="title-wrapper">
                                                                                            <span className="item-title title">
                                                                                                <span>
                                                                                                    <span>
                                                                                                        <span>
                                                                                                            {
                                                                                                                songData.title
                                                                                                            }
                                                                                                        </span>
                                                                                                    </span>
                                                                                                    <span
                                                                                                        style={{
                                                                                                            position:
                                                                                                                'fixed',
                                                                                                            visibility:
                                                                                                                'hidden',
                                                                                                            top: '0px',
                                                                                                            left: '0px',
                                                                                                        }}
                                                                                                    ></span>
                                                                                                </span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </a>
                                                                                    <div className="song-stats">
                                                                                        <div className="stat-item">
                                                                                            <i className="icon ic-like"></i>
                                                                                            <span>
                                                                                                {formatNumber(
                                                                                                    songData.like,
                                                                                                )}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="stat-item">
                                                                                            <i className="icon ic-view"></i>
                                                                                            <span>
                                                                                                {formatNumber(
                                                                                                    songData.listen,
                                                                                                )}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </ul>
                                                                </Tippy>
                                                            </div>
                                                            <ul className="menu-list">
                                                                <div className="group-button-menu">
                                                                    <div className="group-button-list">
                                                                        <button className="osx-btn button">
                                                                            <i className="icon ic-download"></i>
                                                                            <span>Tải xuống</span>
                                                                        </button>
                                                                        <button className="osx-btn button" tabIndex="0">
                                                                            <i className="icon ic-16-Lyric"></i>
                                                                            <span>Lời bài hát</span>
                                                                        </button>
                                                                        <span className="osx-btn button">
                                                                            <i className="icon ic-denial"></i>
                                                                            <span>Chặn</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </ul>
                                                            <ul style={{ paddingBottom: '5px' }} className="menu-list">
                                                                <div>
                                                                    <Tippy
                                                                        interactive
                                                                        offset={[150, -37]}
                                                                        render={(attrs) => (
                                                                            <div
                                                                                {...attrs}
                                                                                className="menu add-playlist-content submenu-content"
                                                                            >
                                                                                <ul className="menu-list">
                                                                                    <li className="search-box">
                                                                                        <input
                                                                                            className="input"
                                                                                            placeholder="Tìm playlist"
                                                                                        />
                                                                                    </li>
                                                                                    <li className="mar-t-10">
                                                                                        <button
                                                                                            className="osx-btn button"
                                                                                            tabIndex="0"
                                                                                        >
                                                                                            <i className="icon ic- z-ic-svg ic-svg-add"></i>
                                                                                            <span>
                                                                                                Tạo playlist mới
                                                                                            </span>
                                                                                        </button>
                                                                                    </li>
                                                                                </ul>
                                                                                <div className="playlist-container">
                                                                                    <div className="top-shadow "></div>
                                                                                    <div className="content">
                                                                                        <div
                                                                                            style={{
                                                                                                position: 'relative',
                                                                                                overflow: 'hidden',
                                                                                                width: '100%',
                                                                                                height: '100%',
                                                                                            }}
                                                                                        >
                                                                                            <div
                                                                                                style={{
                                                                                                    position:
                                                                                                        'absolute',
                                                                                                    inset: '0px',
                                                                                                    overflow:
                                                                                                        'hidden scroll',
                                                                                                    marginRight: '-6px',
                                                                                                    marginBottom: '0px',
                                                                                                }}
                                                                                            >
                                                                                                <ul className="menu-list">
                                                                                                    <li>
                                                                                                        <button
                                                                                                            className="osx-btn button"
                                                                                                            tabIndex="0"
                                                                                                        >
                                                                                                            <i className="icon ic-list-music"></i>
                                                                                                            <span>
                                                                                                                Untitled
                                                                                                            </span>
                                                                                                        </button>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            <div
                                                                                                className="track-horizontal"
                                                                                                style={{
                                                                                                    position:
                                                                                                        'absolute',
                                                                                                    height: '6px',
                                                                                                    transition:
                                                                                                        'opacity 200ms ease 0s',
                                                                                                    opacity: '0',
                                                                                                }}
                                                                                            >
                                                                                                <div
                                                                                                    style={{
                                                                                                        position:
                                                                                                            'relative',
                                                                                                        display:
                                                                                                            'block',
                                                                                                        height: '100%',
                                                                                                        cursor: 'pointer',
                                                                                                        borderRadius:
                                                                                                            'inherit',
                                                                                                        backgroundColor:
                                                                                                            'rgba(0, 0, 0, 0.2)',
                                                                                                        width: '0px',
                                                                                                    }}
                                                                                                ></div>
                                                                                            </div>
                                                                                            <div
                                                                                                className="track-vertical"
                                                                                                style={{
                                                                                                    position:
                                                                                                        'absolute',
                                                                                                    width: '4px',
                                                                                                    transition:
                                                                                                        'opacity 200ms ease 0s',
                                                                                                    opacity: '0',
                                                                                                    right: '2px',
                                                                                                    top: '2px',
                                                                                                    bottom: '2px',
                                                                                                    zIndex: '100',
                                                                                                }}
                                                                                            >
                                                                                                <div
                                                                                                    className="thumb-vertical"
                                                                                                    style={{
                                                                                                        position:
                                                                                                            'relative',
                                                                                                        display:
                                                                                                            'block',
                                                                                                        width: '100%',
                                                                                                        height: '0px',
                                                                                                    }}
                                                                                                ></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    >
                                                                        <li>
                                                                            <div className="menu-list--submenu">
                                                                                <button
                                                                                    className="osx-btn button"
                                                                                    tabIndex="0"
                                                                                >
                                                                                    <i className="icon ic-16-Add"></i>
                                                                                    <span>Thêm vào playlist</span>
                                                                                    <i className="icon ic-go-right"></i>
                                                                                </button>
                                                                            </div>
                                                                        </li>
                                                                    </Tippy>
                                                                </div>
                                                                <li>
                                                                    <button className="osx-btn button" tabIndex="0">
                                                                        <i className="icon ic-karaoke"></i>
                                                                        <span>Phát cùng lời bài hát</span>
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button className="osx-btn button" tabIndex="0">
                                                                        <i className="icon ic-comment"></i>
                                                                        <span>Bình luận</span>
                                                                        {songData.comment > 0 ? (
                                                                            <span className="comment-badge"></span>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button className="osx-btn button" tabIndex="0">
                                                                        <i className="icon ic-link"></i>
                                                                        <span>Sao chép link</span>
                                                                    </button>
                                                                </li>
                                                                <div>
                                                                    <Tippy
                                                                        offset={[150, -37]}
                                                                        interactive
                                                                        render={(attrs) => (
                                                                            <div
                                                                                {...attrs}
                                                                                className="menu share-content submenu-content"
                                                                            >
                                                                                <ul className="menu-list">
                                                                                    <li>
                                                                                        <button
                                                                                            className="osx-btn button"
                                                                                            tabIndex="0"
                                                                                        >
                                                                                            <i className="icon z-ic-svg ic-svg-fb"></i>
                                                                                            <span>Facebook</span>
                                                                                        </button>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a
                                                                                            href="#f"
                                                                                            className="zalo-share-button osx-btn button"
                                                                                            role="button"
                                                                                            data-href=""
                                                                                            data-customize="true"
                                                                                            data-oaid="4073327408156217288"
                                                                                        >
                                                                                            <i className="icon z-ic-svg ic-svg-zalo"></i>
                                                                                            Zalo
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <button
                                                                                            className="osx-btn button"
                                                                                            tabIndex="0"
                                                                                        >
                                                                                            <i className="icon ic-code"></i>
                                                                                            <span>Mã nhúng</span>
                                                                                        </button>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    >
                                                                        <li>
                                                                            <div className="menu-list--submenu">
                                                                                <button
                                                                                    className="osx-btn button"
                                                                                    tabIndex="0"
                                                                                >
                                                                                    <i className="icon ic-share"></i>
                                                                                    <span>Chia sẻ</span>
                                                                                    <i className="icon ic-go-right"></i>
                                                                                </button>
                                                                            </div>
                                                                        </li>
                                                                    </Tippy>
                                                                </div>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            >
                                                <div className="level-item">
                                                    <ToolTip content="Khác">
                                                        <button
                                                            onClick={() =>
                                                                infoMenuVisible === 'hidden'
                                                                    ? setInfoMenuVisible('visible')
                                                                    : setInfoMenuVisible('hidden')
                                                            }
                                                            className="osx-btn osx-tooltip-btn btn-more is-hover-circle button"
                                                            tabIndex="0"
                                                        >
                                                            <i
                                                                className="icon ic-more"
                                                                style={{ color: '#999999' }}
                                                            ></i>
                                                        </button>
                                                    </ToolTip>
                                                </div>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SongController
                            isPlaying={isPlaying}
                            onPlayPause={() => handlePlayPause()}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onSeek={handleSeek}
                            currentTime={currentTime}
                            duration={songData.duration}
                            isRepeating={isRepeating}
                            isShuffling={isShuffling}
                            setRepeating={setRepeating}
                            setShuffling={setShuffling}
                        />
                        <div className="player-controls-right level-right">
                            <div className="level-item is-narrow">
                                <ToolTip content="Xem MV">
                                    <button
                                        disabled={songData.mvlink ? false : true}
                                        className="osx-btn osx-tooltip-btn btn-mv is-hover-circle button"
                                        tabIndex="-1"
                                    >
                                        <i style={{ color: '#999999', fontSize: '20px' }} className="icon ic-mv"></i>
                                    </button>
                                </ToolTip>
                            </div>
                            <div className="level-item is-narrow" style={{ padding: '2px' }}>
                                <ToolTip content="Xem lời bài hát">
                                    <button
                                        className="osx-btn osx-tooltip-btn btn-mv is-hover-circle button"
                                        tabIndex="-1"
                                        onClick={() => {
                                            nowplayingbarRef.current.classList.add('is-idle');
                                            playerControlsRef.current.classList.add('opac');
                                            setLyricsShowing(true);
                                        }}
                                        disabled={!songData.hasLyric}
                                    >
                                        <i className="icon">
                                            <KaraokeIcon />
                                        </i>
                                    </button>
                                </ToolTip>
                            </div>
                            <div className="level-item is-narrow" style={{ padding: '2px' }}>
                                <div className="osx-player-volume">
                                    <ToolTip content={`${volume !== 0 ? 'Tắt âm' : 'Hủy tắt âm'}`}>
                                        <button
                                            onClick={() => {
                                                if (volume !== 0) {
                                                    audio.volume = 0;
                                                    setPrevVolume(volume);
                                                    setVolume(0);
                                                } else {
                                                    audio.volume = prevVolume;
                                                    setVolume(prevVolume);
                                                }
                                            }}
                                            className="osx-btn osx-tooltip-btn btn-volume button is-hover-circle"
                                            tabIndex="0"
                                        >
                                            <i className="icon">
                                                {volume === 0 ? <VolumeOffIcon /> : <VolumeDownIcon />}
                                            </i>
                                        </button>
                                    </ToolTip>
                                    <div
                                        className="osx-duration-bar"
                                        onClick={handleSeek}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <div
                                            className="osx-slider-bar"
                                            style={{
                                                background: `linear-gradient(to right, var(--progressbar-active-bg) 0%, var(--progressbar-active-bg) ${
                                                    volume * 100
                                                }%, var(--progressbar-player-bg) ${
                                                    volume * 100
                                                }%, var(--progressbar-player-bg) 100%)`,
                                                alignSelf: 'center',
                                            }}
                                            ref={progressBarRef}
                                        >
                                            <div
                                                tabIndex="0"
                                                aria-valuemax="100"
                                                aria-valuemin="0"
                                                aria-valuenow="0"
                                                draggable="false"
                                                role="slider"
                                                className="osx-slider-handle"
                                                onMouseDown={handleDragStart}
                                                onMouseUp={handleDragEnd}
                                                style={{
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--progressbar-active-bg)',
                                                    transform: `translate(${volume * 90 - 5}px, -3.5px)`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NowPlayingBar;
