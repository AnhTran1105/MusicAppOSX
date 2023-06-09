import { FormatTime } from '../../utils/FormatTime';
import { Fragment } from 'react';
import ToolTip from '@tippyjs/react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useStore, actions } from '../../store';
import SongMenu from '../SongMenu';
import usePortal from 'react-cool-portal';
import FavouriteButton from '../FavouriteButton';

function SongItem({ props, isSongPrefix = false, isContent = false, loadSongList, songId, ranking = null }) {
    const [songInfo, setSongInfo] = useState(null);
    const [songSrc, setSongSrc] = useState(null);
    const [isBusy, setBusy] = useState(true);
    const id = props ? props.encodeId : songId;
    const [state, dispatch] = useStore();

    const { Portal, show, hide } = usePortal({
        defaultShow: false, // The default visibility of portal, default is true
    });

    useEffect(() => {
        (async () => {
            try {
                setSongInfo(await getSongInfo(id));
                setSongSrc(await getSongSrc(id));

                setBusy(false);
            } catch (error) {
                console.error('Error fetching song info and song source:', error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getSongInfo = async (id) => {
        try {
            const response = await axios.get(`get-info-song/?id=${id}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const getSongSrc = async (id) => {
        try {
            const response = await axios.get(`get-song/?id=${id}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    if (isBusy) return null;

    return (
        <>
            <div className={`media ${songSrc ? '' : 'is-vip'}`}>
                <div className="media-left">
                    {ranking ? (
                        <div className="song-prefix mar-r-15">
                            <span className={`number is-top-${ranking} is-center mar-r-5`}>{ranking}</span>
                            <div className="sort">
                                <i
                                    className={`icon is-18x18 is-center ${
                                        props.rakingStatus === 0
                                            ? 'grey ic-balance'
                                            : props.rakingStatus > 0
                                            ? 'green ic-up'
                                            : 'red ic-down'
                                    } `}
                                ></i>
                                {props.rakingStatus !== 0 ? (
                                    <span className="sort-num is-18x18 is-center">{Math.abs(props.rakingStatus)}</span>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {isSongPrefix ? (
                        <div className="song-prefix mar-r-10">
                            <i className="icon ic-song"></i>
                        </div>
                    ) : (
                        ''
                    )}
                    <div
                        onClick={() => {
                            loadSongList();
                            if (songSrc) {
                                dispatch(actions.setSongId(id));
                            } else {
                                show();
                            }
                        }}
                        className="song-thumb"
                    >
                        <figure className="image is-40x40" title={songInfo.title}>
                            <img src={songInfo.thumbnail} alt="" />
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
                        <div className="title-wrapper">
                            <span className="item-title title">
                                <span>
                                    <span>
                                        <span>{songInfo.title}</span>
                                    </span>
                                    <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>
                                        …
                                    </span>
                                </span>
                                {songSrc ? '' : <i className="icon ic- z-ic-svg ic-svg-vip-label"></i>}
                            </span>
                        </div>
                        <h3 className="is-one-line is-truncate subtitle">
                            {songInfo.artists
                                ? songInfo.artists.map((artist, i) =>
                                      i === songInfo.artists.length - 1 ? (
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
                                : ''}
                        </h3>
                    </div>
                </div>
                {isContent ? (
                    <div className="media-content">
                        <div className="album-info">
                            <span>
                                <span>
                                    <Link to={songInfo.album ? songInfo.album.link : ''}>
                                        {songInfo.album ? songInfo.album.title : ''}
                                    </Link>
                                </span>
                                <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>
                                    …
                                </span>
                            </span>
                        </div>
                    </div>
                ) : (
                    ''
                )}

                <div className="media-right">
                    <div className="hover-items">
                        <div className="level">
                            <div className="level-item">
                                {songInfo.mvlink ? (
                                    <ToolTip content="Xem MV">
                                        <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                                            <i className="icon ic-mv"></i>
                                        </button>
                                    </ToolTip>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="level-item">
                                <ToolTip content="Phát cùng lời bài hát">
                                    <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                                        <i className="icon ic-karaoke"></i>
                                    </button>
                                </ToolTip>
                            </div>
                            <div className="level-item">
                                <FavouriteButton songId={id} />
                            </div>
                            <div className="level-item">
                                <SongMenu props={songInfo} />
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
                            <div className="level-item duration">{FormatTime(songInfo.duration)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Portal>
                <div className="osx-portal-modal">
                    <div className="modal is-active">
                        <div role="presentation" className="modal-background" onClick={hide}>
                            <div className="modal-content">
                                <div className="vip-content">
                                    <ToolTip content="Đóng">
                                        <button
                                            onClick={hide}
                                            className="osx-btn osx-tooltip-btn close-btn button"
                                            tabIndex="0"
                                        >
                                            <i className="icon ic-close"></i>
                                        </button>
                                    </ToolTip>
                                    <h3 className="title">Dành cho tài khoản VIP</h3>
                                    <h3 className="subtitle">
                                        Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để nghe bài hát
                                        này.
                                    </h3>
                                    <a
                                        className="osx-btn is-yellow mar-t-25 is-fullwidth is-upper button"
                                        tabIndex="0"
                                        href="vip"
                                        target="_blank"
                                    >
                                        Nâng cấp VIP
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        </>
    );
}

export default SongItem;
