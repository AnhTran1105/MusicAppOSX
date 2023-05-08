import { KaraokeIcon, StarIcon, VolumeDownIcon } from '../../icons';
import { useState, useEffect } from 'react';
import ToolTip from '@tippyjs/react';
import SongController from '../SongController';
import { useStore, actions } from '../../store';
import axios from '../../utils/axios';
import Skeleton from 'react-loading-skeleton';
import { Fragment } from 'react';

let audio;
function NowPlayingBar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(240);
    const [songData, setSongData] = useState(null);
    const [songSrc, setSongSrc] = useState(null);

    const [state, dispatch] = useStore();
    const songId = state.songId;

    useEffect(() => {
        if (songId) {
            (async () => {
                try {
                    audio = document.querySelector('.--z--player audio');
                    const data = await getInfoSong(songId);
                    const src = await getSong(songId);
                    audio.setAttribute('src', src[128]);
                    audio.play();
                    setSongData(data);
                    setSongSrc(src);
                } catch (error) {
                    console.error('Error fetching song info and song source:', error);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songId]);

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
            const response = await axios.get('get-info-song/', {
                params: {
                    id: songId,
                },
            });
            return response;
            // Xử lý dữ liệu nhận được từ server ở đây
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    };

    useEffect(() => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
    }, [isPlaying]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // Xử lý sự kiện khi nhấn nút Next
    const handleNext = () => {
        // Thực hiện logic chuyển bài hát kế tiếp
    };

    // Xử lý sự kiện khi nhấn nút Previous
    const handlePrevious = () => {
        // Thực hiện logic chuyển bài hát trước đó
    };

    // Xử lý sự kiện khi tua bài hát
    const handleSeek = (seekTime) => {
        setCurrentTime(seekTime);
        // Thực hiện logic tua bài hát tới thời gian seekTime
    };

    return (
        <div className="now-playing-bar">
            <div className="player-controls clickable">
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
                                                <a key={i} className="is-ghost" href={artist.link}>
                                                    {artist.name}
                                                </a>
                                            ) : (
                                                <Fragment key={i}>
                                                    <a className="is-ghost" href={artist.link}>
                                                        {artist.name}
                                                    </a>
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
                                        <ToolTip content="Add to favourites">
                                            <button
                                                className="osx-btn osx-tooltip-btn osx-disable-transition active is-hover-circle button"
                                                tabIndex="0"
                                            >
                                                <i className="icon">
                                                    <StarIcon color="#999999" />
                                                </i>
                                            </button>
                                        </ToolTip>
                                    </div>
                                    <div className="level-item">
                                        <ToolTip content="More">
                                            <button
                                                className="osx-btn osx-tooltip-btn btn-more is-hover-circle button"
                                                tabIndex="0"
                                            >
                                                <i className="icon ic-more" style={{ color: '#999999' }}></i>
                                            </button>
                                        </ToolTip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SongController
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onSeek={handleSeek}
                        currentTime={currentTime}
                        duration={duration}
                    />
                    <div className="player-controls-right level-right">
                        <div className="level-item is-narrow">
                            <ToolTip content="Watch MV">
                                <button
                                    className="osx-btn osx-tooltip-btn btn-mv is-hover-circle button"
                                    tabIndex="-1"
                                    disabled=""
                                >
                                    <i style={{ color: '#999999', fontSize: '20px' }} className="icon ic-mv"></i>
                                </button>
                            </ToolTip>
                        </div>
                        <div className="level-item is-narrow" style={{ padding: '2px' }}>
                            <ToolTip content="View lyrics">
                                <button
                                    className="osx-btn osx-tooltip-btn btn-mv is-hover-circle button"
                                    tabIndex="-1"
                                    disabled=""
                                >
                                    <i className="icon">
                                        <KaraokeIcon />
                                    </i>
                                </button>
                            </ToolTip>
                        </div>
                        <div className="level-item is-narrow" style={{ padding: '2px' }}>
                            <div className="osx-player-volume">
                                <ToolTip content="Mute">
                                    <button
                                        className="osx-btn osx-tooltip-btn btn-volume button is-hover-circle"
                                        tabIndex="0"
                                    >
                                        <i className="icon">
                                            <VolumeDownIcon />
                                        </i>
                                    </button>
                                </ToolTip>
                                <div className="osx-duration-bar">
                                    <div
                                        className="osx-slider-bar"
                                        style={{
                                            background:
                                                'linear-gradient(to right, var(--volume-active-bg) 0%, var(--volume-active-bg) 28.0354%, var(--progressbar-player-bg) 28.0354%, var(--progressbar-player-bg) 100%)',
                                            alignSelf: 'center',
                                        }}
                                    >
                                        <div
                                            tabIndex="0"
                                            aria-valuemax="100"
                                            aria-valuemin="0"
                                            aria-valuenow="0"
                                            draggable="false"
                                            role="slider"
                                            className="osx-slider-handle"
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: '#fff',
                                                transform: 'translate(22px, -3.5px)',
                                                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
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

export default NowPlayingBar;
