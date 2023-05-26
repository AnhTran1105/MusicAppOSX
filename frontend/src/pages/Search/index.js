import { useParams } from 'react-router-dom';

function Search() {
    const { searchQuery } = useParams();
    console.log(searchQuery);
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
                                            <a className="" href="/tim-kiem/tat-ca?q=sontungmtp">
                                                Tất cả
                                            </a>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <a className="" href="/tim-kiem/bai-hat?q=sontungmtp">
                                                Bài hát
                                            </a>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <a className="" href="/tim-kiem/playlist?q=sontungmtp">
                                                playlist/album
                                            </a>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <a className="" href="/tim-kiem/artist?q=sontungmtp">
                                                Nghệ sĩ/OA
                                            </a>
                                        </div>
                                    </li>
                                    <li className="osx-navbar-item">
                                        <div className="navbar-link">
                                            <a className="" href="/tim-kiem/video?q=sontungmtp">
                                                MV
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="container page-search">
                            <div>
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
                            </div>
                            <div className="container mar-t-30">
                                <h3 className="osx-section-title title is-2">
                                    Bài Hát
                                    <a className="discovery-btn" href="/tim-kiem/bai-hat?q=sontungmtp">
                                        Tất cả <i className="icon ic-go-right"></i>
                                    </a>
                                </h3>
                                <div className="list list-border">
                                    <div className="list-item media-item hide-right">
                                        <div className="media">
                                            <div className="media-left">
                                                <div className="song-thumb">
                                                    <figure
                                                        className="image is-40x40"
                                                        title="Thái Bình Mồ Hôi Rơi (Extended Mix)"
                                                    >
                                                        <img
                                                            src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"
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
                                                    <div className="title-wrapper">
                                                        <span className="item-title has-icon title">
                                                            <span>
                                                                <span>
                                                                    <span>Thái Bình Mồ Hôi Rơi (Extended Mix)</span>
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
                                                            <i
                                                                className="icon ic-global"
                                                                title="Tải lên bởi nguyen_trinh1234"
                                                            ></i>
                                                        </span>
                                                    </div>
                                                    <h3 className="is-one-line is-truncate subtitle">
                                                        <span className="artist-names">
                                                            <span>SonTungMTP</span>
                                                        </span>
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="media-content"></div>
                                            <div className="media-right">
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
                                                        <div className="level-item duration">06:47</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="osx-section playlist-section mar-t-30">
                                <div className="container">
                                    <h3 className="osx-section-title title is-2">
                                        Playlist/Album
                                        <a className="discovery-btn" href="/tim-kiem/playlist?q=sontungmtp">
                                            Tất cả <i className="icon ic-go-right"></i>
                                        </a>
                                    </h3>
                                    <div className="osx-carousel-wrapper">
                                        <div className="osx-carousel">
                                            <div
                                                className="osx-carousel__container"
                                                style={{ transform: 'translate3d(0px, 0px, 0px)' }}
                                            >
                                                <div className="osx-carousel-item is-fullhd-20 is-widescreen-20 is-desktop-3 is-touch-3 is-tablet-3">
                                                    <div className="playlist-wrapper is-normal">
                                                        <div className="osx-card">
                                                            <div>
                                                                <a
                                                                    className=""
                                                                    title="sơntungmtp"
                                                                    href="/playlist/sontungmtp/ZU8W7O78.html"
                                                                >
                                                                    <div className="osx-card-image">
                                                                        <figure className="image is-48x48">
                                                                            <img
                                                                                src="https://photo-playlist-zmp3.zmdcdn.me/user-playlist?src=HavwqN7EvKCI1oYSFOdqNqjKTTqzYUaELGPsZZYBu0fN0YtRETldKWPLUO1jtEvHLWHts3smw5nKOdVUFx3gMaWnD8qpzhXH0tDzrNYYyGPEFph4PFloMra_EeyruFK63prlXJMpzGTQQMg1OR7t05rhO8KsuVq5NJyCX33jaGTTFWUFCFl3JmuoGTqxi846KNaLb6lzpK50PKoKDhlDGLep1PCoxvuJMc06bsNfdqDUPWALFkwT5GOo09Kvl9bwKMC2_Zond7TJRXojUkAGCG5bL-yplDjbI3GQetIjnpn9QLgZTB7DTqmxL_OjifXtHs5KetphcNONOGNtBBdDTK1bM_D6lyPpBsHV-a6wnsHo8GxsVG&amp;size=thumb/240_240"
                                                                                alt=""
                                                                            />
                                                                        </figure>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div className="osx-card-content">
                                                                <h4 className="title is-6">
                                                                    <a
                                                                        className=""
                                                                        title="sơntungmtp"
                                                                        href="/playlist/sontungmtp/ZU8W7O78.html"
                                                                    >
                                                                        <span>
                                                                            <span>
                                                                                <span>sơntungmtp</span>
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
                                                                    </a>
                                                                </h4>
                                                                <h3 className="mt-10 subtitle">Đâu Van Vuong</h3>
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
                                            className="osx-btn osx-carousel-control-next is-hide button"
                                            tabIndex="0"
                                        >
                                            <i className="icon ic-go-right"></i>
                                        </button>
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

export default Search;
