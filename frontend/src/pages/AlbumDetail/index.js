import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import toDateString from '../../utils/toDateString';
import ToolTip from '@tippyjs/react';
import { Link } from 'react-router-dom';
import SelectItem from './SelectItem';

function AlbumDetail() {
    const [data, setData] = useState(null);
    const { albumId } = useParams();
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        if (albumId) {
            (async () => {
                try {
                    setData(await getAlbumDetail(albumId));
                    setBusy(false);
                } catch (error) {
                    console.error('Error fetching song info and song source:', error);
                }
            })();
        }
    }, [albumId]);

    const getAlbumDetail = async (albumId) => {
        try {
            const response = await axios.get(`get-detail-playlist/?id=${albumId}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {}, [isBusy]);

    if (isBusy) {
        return null;
    }

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
                    <div className="container pad-20">
                        <div className="container playlist-detail-container">
                            <div className="clearfix mar-b-30">
                                <div className="media playlist-header sticky">
                                    <div className="media-left">
                                        <div className="osx-card header-thumbnail">
                                            <div className="osx-card-image">
                                                <div className="z-thumb">
                                                    <figure className="image is-48x48">
                                                        <img src={data.thumbnailM} alt="" />
                                                    </figure>
                                                    <div className="opacity"></div>
                                                </div>
                                                <div className="osx-actions-container">
                                                    <div className="osx-box osx-actions playlist-actions">
                                                        <button
                                                            className="osx-btn osx-tooltip-btn animation-like is-hidden active is-hover-circle button"
                                                            tabIndex="0"
                                                        >
                                                            <i className="icon ic-like"></i>
                                                            <i className="icon ic-like-full"></i>
                                                        </button>
                                                        <button className="osx-btn action-play  button" tabIndex="0">
                                                            <i className="icon action-play ic-svg-play-circle"></i>
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
                                        </div>
                                    </div>
                                    <div className="media-content">
                                        <div className="content-top">
                                            <h3 className="title">{data.title}</h3>
                                            <div className="release">
                                                Cập nhật: {toDateString(data.contentLastUpdate)}
                                            </div>
                                            <div className="artists">
                                                <Link className="is-ghost" to={data.link}>
                                                    {data.artistsNames}
                                                </Link>
                                            </div>
                                            <div className="like">
                                                {data.like >= 1000 ? Math.floor(data.like / 1000) : data.like} người yêu
                                                thích
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <button
                                                className="osx-btn btn-play-all is-outlined active is-medium is-upper button"
                                                tabIndex="0"
                                            >
                                                <i className="icon ic-play"></i>
                                                <span>Phát ngẫu nhiên</span>
                                            </button>
                                            <div className="level">
                                                <div className="level-item is-narrow">
                                                    <ToolTip content="Thêm vào thư viện">
                                                        <button
                                                            className="osx-btn osx-tooltip-btn animation-like mar-r-10 active is-hover-circle button"
                                                            tabIndex="0"
                                                        >
                                                            <i className="icon ic-like"></i>
                                                            <i className="icon ic-like-full"></i>
                                                        </button>
                                                    </ToolTip>
                                                </div>
                                                <div className="level-item is-narrow">
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
                                        </div>
                                    </div>
                                </div>
                                <div className="playlist-content">
                                    <div className="description">
                                        <span>
                                            <span>
                                                <span>{data.sortDescription}</span>
                                            </span>
                                            <span
                                                style={{
                                                    position: 'fixed',
                                                    visibility: 'hidden',
                                                    top: '0px',
                                                    left: '0px',
                                                }}
                                            >
                                                <span className="read-more">... Xem thêm</span>
                                            </span>
                                        </span>
                                    </div>
                                    <div className="list mar-b-10 song-list-select">
                                        <div className="media select-header">
                                            <div className="media-left">
                                                <div className="sort-wrapper">
                                                    <div className="osx-dropdown osx-group-dropdown mar-r-10">
                                                        <div className="osx-dropdown-trigger-btn">
                                                            <button className="osx-btn button" tabIndex="0">
                                                                <i className="icon ic-24-Sort"></i>
                                                            </button>
                                                        </div>
                                                        <div className="osx-dropdown-content">
                                                            <div className="osx-dropdown-list-item">Mặc định</div>
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
                                            {data.song.items.map((item) => (
                                                <SelectItem key={item.encodeId} props={item} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bottom-info">
                                        <p className="playlist-songs-info">
                                            <span>{data.song.total} bài hát</span>•
                                            <span>{Math.floor(data.song.totalDuration / 60)} phút</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AlbumDetail;
