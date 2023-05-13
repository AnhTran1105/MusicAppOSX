import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import FormatNumber from '../../utils/FormatNumber';
import SongItem from '../../components/SongItem/SongItem';
import { Link } from 'react-router-dom';

function Artist() {
    const [data, setData] = useState(null);
    const { alias } = useParams();
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        if (alias) {
            (async () => {
                try {
                    setData(await getArtist(alias));
                    setBusy(false);
                } catch (error) {
                    console.error('Error fetching song info and song source:', error);
                }
            })();
        }
    }, [alias]);

    const getArtist = async (alias) => {
        try {
            const response = await axios.get(`get-artist/?name=${alias}`);
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
                    <div className="container mar-b-30">
                        <div className="artist-page">
                            <div className="artist-hero has-cover">
                                <div
                                    className="artist-cover"
                                    style={{
                                        left: '-118px',
                                        right: '-118px',
                                        backgroundImage:
                                            'url(https://photo-zmp3.zmdcdn.me/cover_artist/2/1/5/4/21545e4d3c3460644c12d2cb15058a12.jpg)',
                                    }}
                                ></div>
                                <div className="container hero-body">
                                    <div className="left">
                                        <div className="information">
                                            <div className="top">
                                                <h3
                                                    className="artist-name title"
                                                    style={{ width: 'fitContent', fontSize: '60px' }}
                                                >
                                                    <span>
                                                        <span>
                                                            <span>{data.name}</span>
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
                                                </h3>
                                                <button
                                                    className="osx-btn play-btn pause is-outlined active is-medium button"
                                                    tabIndex="0"
                                                >
                                                    <i className="icon ic-play"></i>
                                                </button>
                                            </div>
                                            <div className="bottom">
                                                <span className="follow">
                                                    {FormatNumber(data.totalFollow)} người quan tâm
                                                </span>
                                                <button
                                                    className="osx-btn is-outlined active is-medium follow-btn is-upper button"
                                                    tabIndex="0"
                                                >
                                                    <i className="icon ic-addfriend"></i>
                                                    <span>Quan tâm</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="artist-home-content">
                                <div className="top-section-container">
                                    <div className="latest-section">
                                        <div className="container">
                                            <h3 className="osx-section-title title is-2">Mới phát hành</h3>
                                            <Link
                                                className=""
                                                title="Chạm Gần Thêm Thương (Single)"
                                                to="/album/Cham-Gan-Them-Thuong-Single-Truc-Nhan/SBAAC86A.html"
                                            >
                                                <div className="playlist-wrapper is-normal allow-click">
                                                    <div className="osx-card">
                                                        <div className="osx-card-image">
                                                            <figure className="image is-48x48">
                                                                <img
                                                                    src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/2/9/2/1/2921ba8c864f779d19238db927a03ab2.jpg"
                                                                    alt=""
                                                                />
                                                            </figure>
                                                        </div>
                                                        <div className="osx-card-content">
                                                            <span>Single</span>
                                                            <h3 className="title">
                                                                <span>
                                                                    <span>
                                                                        <span>Chạm Gần Thêm Thương</span>
                                                                        <br></br>
                                                                        <span>(Single)</span>
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
                                                            </h3>
                                                            <span className="artist-name">
                                                                <h3 className="is-one-line is-truncate subtitle">
                                                                    <Link className="is-ghost" to="/Truc-Nhan">
                                                                        Trúc Nhân
                                                                    </Link>
                                                                </h3>
                                                            </span>
                                                            <span>12/05/2023</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="media-blur">
                                                <div
                                                    className="cover-bg"
                                                    style={{
                                                        backgroundImage:
                                                            'url("https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/9/2/1/2921ba8c864f779d19238db927a03ab2.jpg")',
                                                    }}
                                                ></div>
                                                <div className="gradient-layer"></div>
                                                <div className="blur-layer"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <h3 className="osx-section-title title is-2">
                                            Bài hát nổi bật
                                            <a className="discovery-btn" href="/Truc-Nhan/bai-hat">
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
                                                        {data.sections
                                                            .filter((section) => section.sectionType === 'song')[0]
                                                            .items.slice(0, 6)
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
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Artist;
