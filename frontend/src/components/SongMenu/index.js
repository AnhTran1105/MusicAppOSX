/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Tippy from '@tippyjs/react/headless';
import ToolTip from '@tippyjs/react';
import usePortal from 'react-cool-portal';
import formatNumber from '../../utils/formatNumber';

function SongMenu({ props }) {
    const { Portal, show } = usePortal({
        defaultShow: false,
    });

    return (
        <Fragment>
            <ToolTip content="Khác">
                <button onClick={show} className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                    <i className="icon ic-more"></i>
                </button>
            </ToolTip>
            <Portal>
                <div className="osx-portal" style={{ left: '1160px', top: '180px' }}>
                    <div className="osx-contextmenu song-menu">
                        <div className="menu">
                            <div>
                                <Tippy
                                    offset={[-350, 0]}
                                    interactive
                                    render={(attrs) => (
                                        <div
                                            {...attrs}
                                            className="submenu-content"
                                            style={{
                                                padding: '0',
                                            }}
                                        >
                                            <div className="song-info-submenu">
                                                <div className="item">
                                                    <h3 className="subtitle">Nghệ sĩ</h3>
                                                    <div className="content">
                                                        {props.artists.map((artist, i) =>
                                                            i === props.artists.length - 1 ? (
                                                                <Link
                                                                    key={i}
                                                                    className="is-ghost"
                                                                    to={artist ? artist.link : ''}
                                                                >
                                                                    {artist.name}
                                                                </Link>
                                                            ) : (
                                                                <Fragment key={i}>
                                                                    <Link
                                                                        className="is-ghost"
                                                                        to={artist ? artist.link : ''}
                                                                    >
                                                                        {artist.name}
                                                                    </Link>
                                                                    ,{' '}
                                                                </Fragment>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="item">
                                                    <h3 className="subtitle">Album</h3>
                                                    <div className="content">
                                                        <a className="" href={props.album ? props.album.link : ''}>
                                                            {props.album.title}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="item">
                                                    <h3 className="subtitle">Thể loại</h3>
                                                    <div className="content">
                                                        {props.genres.map((genre, i) =>
                                                            i === props.genres.length - 1 ? (
                                                                <a
                                                                    key={i}
                                                                    className=""
                                                                    href={genre ? genre.link : ''}
                                                                    title={genre.name}
                                                                >
                                                                    {genre.name}
                                                                </a>
                                                            ) : (
                                                                <Fragment key={i}>
                                                                    <a
                                                                        className=""
                                                                        href={genre ? genre.link : ''}
                                                                        title={genre.name}
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
                                    <ul className="menu-list">
                                        <div className="menu-list--submenu">
                                            <div className="media song-info-menu">
                                                <div className="media-left">
                                                    <figure className="image is-40x40">
                                                        <img src={props.thumbnail} alt="" />
                                                    </figure>
                                                </div>
                                                <div className="is-w-150 media-content">
                                                    <a>
                                                        <div className="title-wrapper">
                                                            <span className="item-title title">
                                                                <span>
                                                                    <span>
                                                                        <span>{props.title}</span>
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            position: 'fixed',
                                                                            visibility: 'hidden',
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
                                                            <span>{formatNumber(props.like)}</span>
                                                        </div>
                                                        <div className="stat-item">
                                                            <i className="icon ic-view"></i>
                                                            <span>{formatNumber(props.listen)}</span>
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
                                <li>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon ic-like"></i>
                                        <span>Thêm vào thư viện</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon ic-add-play-now"></i>
                                        <span>Thêm vào danh sách phát</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon ic-play-next"></i>
                                        <span>Phát tiếp theo</span>
                                    </button>
                                </li>
                                <div>
                                    <Tippy
                                        interactive
                                        offset={[-350, -37]}
                                        render={(attrs) => (
                                            <div {...attrs} className="menu add-playlist-content submenu-content">
                                                <ul className="menu-list">
                                                    <li className="search-box">
                                                        <input className="input" placeholder="Tìm playlist" />
                                                    </li>
                                                    <li className="mar-t-10">
                                                        <button className="osx-btn button" tabIndex="0">
                                                            <i className="icon ic- z-ic-svg ic-svg-add"></i>
                                                            <span>Tạo playlist mới</span>
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
                                                                    position: 'absolute',
                                                                    inset: '0px',
                                                                    overflow: 'hidden scroll',
                                                                    marginRight: '-6px',
                                                                    marginBottom: '0px',
                                                                }}
                                                            >
                                                                <ul className="menu-list">
                                                                    <li>
                                                                        <button className="osx-btn button" tabIndex="0">
                                                                            <i className="icon ic-list-music"></i>
                                                                            <span>MP</span>
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="osx-btn button" tabIndex="0">
                                                                            <i className="icon ic-list-music"></i>
                                                                            <span>noname</span>
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="osx-btn button" tabIndex="0">
                                                                            <i className="icon ic-list-music"></i>
                                                                            <span>My love music</span>
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="osx-btn button" tabIndex="0">
                                                                            <i className="icon ic-list-music"></i>
                                                                            <span>Binz, Khói,...</span>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className="track-horizontal"
                                                                style={{
                                                                    position: 'absolute',
                                                                    height: '6px',
                                                                    transition: 'opacity 200ms ease 0s',
                                                                    opacity: '0',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        position: 'relative',
                                                                        display: 'block',
                                                                        height: '100%',
                                                                        cursor: 'pointer',
                                                                        borderRadius: 'inherit',
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                                        width: '0px',
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <div
                                                                className="track-vertical"
                                                                style={{
                                                                    position: 'absolute',
                                                                    width: '4px',
                                                                    transition: 'opacity 200ms ease 0s',
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
                                                                        position: 'relative',
                                                                        display: 'block',
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
                                                <button className="osx-btn button" tabIndex="0">
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
                                        {props.comment > 0 ? <span className="comment-badge"></span> : ''}
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
                                        offset={[-350, -37]}
                                        interactive
                                        render={(attrs) => (
                                            <div {...attrs} className="menu share-content submenu-content">
                                                <ul className="menu-list">
                                                    <li>
                                                        <button className="osx-btn button" tabIndex="0">
                                                            <i className="icon z-ic-svg ic-svg-fb"></i>
                                                            <span>Facebook</span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <a
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
                                                        <button className="osx-btn button" tabIndex="0">
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
                                                <button className="osx-btn button" tabIndex="0">
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
                </div>
            </Portal>
        </Fragment>
    );
}

export default SongMenu;
