import { FormatTime } from '../../utils/FormatTime';
import { Fragment } from 'react';
import ToolTip from '@tippyjs/react';
import { Link } from 'react-router-dom';

function SongItem({ props, isSongPrefix = false, isContent = false }) {
    if (!props) return null;

    return (
        <div className="media">
            <div className="media-left">
                {isSongPrefix ? (
                    <div className="song-prefix mar-r-10">
                        <i className="icon ic-song"></i>
                    </div>
                ) : (
                    ''
                )}
                <div className="song-thumb">
                    <figure className="image is-40x40" title={props.title}>
                        <img src={props.thumbnail} alt="" />
                    </figure>
                    <div className="opacity "></div>
                    <div className="osx-actions-container">
                        <div className="osx-box osx-actions">
                            <button
                                className="osx-btn osx-tooltip-btn animation-like is-hidden active is-hover-circle button"
                                tabIndex="0"
                            >
                                <i className="icon ic-like"></i>
                                <i className="icon ic-like-full"></i>
                            </button>
                            <button className="osx-btn action-play button" tabIndex="0">
                                <i className="icon action-play ic-play"></i>
                            </button>
                            <button className="osx-btn osx-tooltip-btn is-hidden is-hover-circle button" tabIndex="0">
                                <i className="icon ic-more"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-info">
                    <div className="title-wrapper">
                        <span className="item-title title">
                            <span>
                                <span>
                                    <span>{props.title}</span>
                                </span>
                                <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>
                                    …
                                </span>
                            </span>
                        </span>
                    </div>
                    <h3 className="is-one-line is-truncate subtitle">
                        {props.artists.map((artist, i) =>
                            i === props.artists.length - 1 ? (
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
                        )}
                    </h3>
                </div>
            </div>
            {isContent ? (
                <div className="media-content">
                    <div className="album-info">
                        <span>
                            <span>
                                <Link to={props.album ? props.album.link : ''}>
                                    {props.album ? props.album.title : ''}
                                </Link>
                            </span>
                            <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>…</span>
                        </span>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div className="media-right">
                <div className="hover-items">
                    <div className="level">
                        <div className="level-item"></div>
                        <div className="level-item">
                            <ToolTip content="Phát cùng lời bài hát">
                                <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                                    <i className="icon ic-karaoke"></i>
                                </button>
                            </ToolTip>
                        </div>
                        <div className="level-item">
                            <ToolTip content="Thêm vào thư viện">
                                <button
                                    className="osx-btn osx-tooltip-btn animation-like undefined active is-hover-circle button"
                                    tabIndex="0"
                                >
                                    <i className="icon ic-like"></i>
                                    <i className="icon ic-like-full"></i>
                                </button>
                            </ToolTip>
                        </div>
                        <div className="level-item">
                            <ToolTip content="Khác">
                                <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                                    <i className="icon ic-more"></i>
                                </button>
                            </ToolTip>
                        </div>
                    </div>
                </div>
                <div className="action-items">
                    <div className="level">
                        <div className="level-item">
                            <button
                                className="osx-btn osx-tooltip-btn animation-like undefined active is-hover-circle button"
                                tabIndex="0"
                            >
                                <i className="icon ic-like"></i>
                                <i className="icon ic-like-full"></i>
                            </button>
                        </div>
                        <div className="level-item duration">{FormatTime(props.duration)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongItem;
