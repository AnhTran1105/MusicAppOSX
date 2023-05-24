/* eslint-disable jsx-a11y/anchor-is-valid */
import ToolTip from '@tippyjs/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormatTime } from '../../utils/FormatTime';

function Card({
    imgSize,
    imgSrc,
    title,
    href,
    sortDescription,
    cardTitle,
    artists,
    artistSection = false,
    MvSection = false,
    artistData,
    MvData,
    ArtistImg,
}) {
    let cardContent;
    if (artistSection) {
        cardContent = (
            <>
                <div className="title">
                    <a className="is-ghost" href={artistData.link}>
                        <span>
                            <span>
                                <span>{artistData.name}</span>
                            </span>
                            <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>…</span>
                        </span>
                    </a>
                </div>
                <div className="subtitle">
                    <span className="followers">
                        {artistData.totalFollow > 1000
                            ? Math.floor(artistData.totalFollow / 1000)
                            : artistData.totalFollow}
                        K quan tâm
                    </span>
                </div>
            </>
        );
    } else if (cardTitle) {
        cardContent = (
            <>
                <h4 className="title is-6">
                    <a className="" title={title} href={href}>
                        <span>
                            <span>
                                <span>
                                    <span>{title}</span>
                                </span>
                            </span>
                            <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}></span>
                        </span>
                    </a>
                </h4>
                <h3 className="mt-10 subtitle">
                    <span>
                        <span>
                            {artists.map((artist, i) =>
                                i === artists.length - 1 ? (
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
                        </span>
                        <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}></span>
                    </span>
                </h3>
            </>
        );
    } else {
        cardContent = (
            <h3 className="mt-10 subtitle">
                <span>
                    <span>{sortDescription}</span>
                    <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>…</span>
                </span>
            </h3>
        );
    }

    let Card;
    if (MvSection) {
        Card = (
            <div className="osx-card video-item">
                <div className="image-wrapper">
                    <div className="osx-card-image video-image">
                        <figure className={`image is-${imgSize}`}>
                            <img src={imgSrc} alt="" />
                        </figure>
                        <div className="opacity "></div>
                        <div className="osx-box osx-actions video-actions">
                            <button className="osx-btn action-play button" tabIndex="0">
                                <i className="icon action-play ic-svg-play-circle"></i>
                            </button>
                        </div>
                        <div className="osx-brand">{FormatTime(MvData.duration)}</div>
                    </div>
                    <div className="media">
                        <div className="media-left">
                            <a className="" title={MvData.title} href={MvData.link}>
                                <figure className="image is-40x40 is-rounded">
                                    <img src={ArtistImg} alt="" />
                                </figure>
                            </a>
                        </div>
                        <div className="media-content">
                            <div className="title">
                                <a title={MvData.title}>
                                    <span>
                                        <span>
                                            <span>{MvData.title}</span>
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
                            </div>
                            <div className="subtitle is-one-line">
                                <Link className="is-ghost" to={MvData.artists[0].link}>
                                    {MvData.artists[0].name}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="osx-card-content">{cardContent}</div>
            </div>
        );
    } else {
        Card = (
            <div className={`osx-card ${artistSection ? 'osx-card--artist' : ''}`}>
                <div className="image-wrapper">
                    <Link className="" title={title} to={href}>
                        <div className={`osx-card-image ${artistSection ? 'is-rounded' : ''} `}>
                            <figure className={`image is-${imgSize}`}>
                                <img src={imgSrc} alt="" />
                            </figure>
                            <div className="opacity "></div>
                            <div className="osx-actions-container">
                                <div
                                    className={`osx-box osx-actions ${
                                        artistSection ? 'artist-actions' : 'playlist-actions'
                                    }`}
                                >
                                    <ToolTip content="Thêm vào thư viện">
                                        <button
                                            className={`osx-btn osx-tooltip-btn animation-like ${
                                                artistSection ? 'is-hidden' : ''
                                            } active is-hover-circle button`}
                                            tabIndex="0"
                                        >
                                            <i className="icon ic-like"></i>
                                            <i className="icon ic-like-full"></i>
                                        </button>
                                    </ToolTip>
                                    <button className="osx-btn action-play button" tabIndex="0">
                                        <i
                                            className={`icon action-play ${
                                                artistSection ? 'ic-24-Shuffle' : 'ic-svg-play-circle'
                                            }`}
                                        ></i>
                                    </button>
                                    <ToolTip content="Khác">
                                        <button
                                            className={`osx-btn osx-tooltip-btn ${
                                                artistSection ? 'is-hidden' : ''
                                            } is-hover-circle button`}
                                            tabIndex="0"
                                        >
                                            <i className="icon ic-more"></i>
                                        </button>
                                    </ToolTip>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="osx-card-content">{cardContent}</div>
                {artistSection ? (
                    <div className="osx-card-footer">
                        <button
                            className="osx-btn is-outlined active mar-t-15 mar-b-20 is-small is-upper button"
                            tabIndex="0"
                        >
                            <i className="icon ic-addfriend"></i>
                            <span>Quan tâm</span>
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }

    return <>{Card}</>;
}

export default Card;
