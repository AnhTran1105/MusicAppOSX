import {
    KaraokeIcon,
    NextIcon,
    PauseIcon,
    PlayIcon,
    PreviousIcon,
    RepeatIcon,
    ShuffleIcon,
    StarIcon,
    VolumeDownIcon,
} from '../../icons';
import ToolTip from '@tippyjs/react';

function NowPlayingBar() {
    return (
        <div className="now-playing-bar">
            <div className="player-controls clickable">
                <div className="osx-duration-bar">
                    <div
                        className="osx-slider-bar"
                        style={{
                            background:
                                'linear-gradient(to right, var(--progressbar-active-bg) 0%, var(--progressbar-active-bg) 28.0354%, var(--progressbar-player-bg) 28.0354%, var(--progressbar-player-bg) 100%)',
                            alignSelf: 'center',
                        }}
                    >
                        <div
                            tabIndex="0"
                            aria-valuemax="240.039184"
                            aria-valuemin="0"
                            aria-valuenow="67.295891"
                            draggable="false"
                            role="slider"
                            className="osx-slider-handle"
                            // style="border-radius: 50%; background-color: var(--progressbar-active-bg); transform: translate(131.927px, -3.5px);"
                        ></div>
                    </div>
                </div>
                <div className="level player-controls__container">
                    <div className="player-controls-left level-left">
                        <div className="media">
                            <div className="media-left">
                                <a className="" href="/">
                                    <div className="thumbnail-wrapper">
                                        <div className="thumbnail">
                                            <figure className="image">
                                                <img
                                                    src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/7/2/c/1/72c11a35e2237178c7eaf4f5ce079a31.jpg"
                                                    alt=""
                                                />
                                            </figure>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="media-content">
                                <div className="is-mark level-left">
                                    <div className="song-info-wrapper">
                                        <span className="song-title-item">
                                            <a
                                                className=""
                                                href="/bai-hat/dua-em-ve-nhaa-GREY-D-Chillies/Z69FIDW9.html"
                                            >
                                                <div className="title-wrapper">
                                                    <span className="item-title title">đưa em về nhàa</span>
                                                </div>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <h3 className="is-one-line is-truncate subtitle">
                                    <a className="is-ghost" href="/GREY-D-Doan-The-Lan">
                                        GREY D
                                    </a>
                                    ,{' '}
                                    <a className="is-ghost" href="/Chillies-IW6ZF687">
                                        Chillies
                                    </a>
                                </h3>
                            </div>
                            <div className="media-right">
                                <div className="level">
                                    <div className="level-item">
                                        <ToolTip content="Add to favourites">
                                            <button
                                                className="osx-btn osx-tooltip-btn animation-like osx-disable-transition active is-hover-circle button"
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
                    <div className="player-controls__player-bar level-center">
                        <div className="level-item">
                            <div className="actions">
                                <ToolTip content="Shuffle playlist">
                                    <button
                                        className="osx-btn osx-tooltip-btn btn-shuffle is-hover-circle button"
                                        tabIndex="0"
                                        style={{ margin: '0 24px' }}
                                    >
                                        <i className="icon">
                                            <ShuffleIcon />
                                        </i>
                                    </button>
                                </ToolTip>
                                <ToolTip content="Previous song">
                                    <button
                                        className="osx-btn osx-tooltip-btn btn-pre is-hover-circle button"
                                        tabIndex="0"
                                    >
                                        <i className="icon">
                                            <PreviousIcon />
                                        </i>
                                    </button>
                                </ToolTip>
                                <button className="osx-btn osx-tooltip-btn btn-play button" tabIndex="0">
                                    <i className="icon">
                                        {/* <PauseIcon /> */}
                                        <PlayIcon />
                                    </i>
                                </button>
                                <button
                                    className="osx-btn osx-tooltip-btn btn-next is-hover-circle button"
                                    tabIndex="0"
                                >
                                    <i className="icon">
                                        <NextIcon />
                                    </i>
                                </button>
                                <ToolTip content="Put song on repeat">
                                    <button
                                        className="osx-btn osx-tooltip-btn btn-repeat is-hover-circle button"
                                        tabIndex="0"
                                        style={{ margin: '0 26px' }}
                                    >
                                        <i className="icon">
                                            <RepeatIcon />
                                        </i>
                                    </button>
                                </ToolTip>
                            </div>
                        </div>
                    </div>
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
