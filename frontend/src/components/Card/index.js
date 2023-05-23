import ToolTip from '@tippyjs/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Card({
    imgSize,
    imgSrc,
    title,
    href,
    sortDescription,
    cardTitle,
    artists,
    artistSection = false,
    artistData,
}) {
    let content;
    if (artistSection) {
        content = (
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
        content = (
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
        content = (
            <h3 className="mt-10 subtitle">
                <span>
                    <span>{sortDescription}</span>
                    <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>…</span>
                </span>
            </h3>
        );
    }

    return (
        <div className={`osx-card ${artistSection ? 'osx-card--artist' : ''}`}>
            <div className="image-wrapper">
                <Link className="" title={title} to={href}>
                    <div className={`osx-card-image ${artistSection ? 'is-rounded' : ''}`}>
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
                                <ToolTip content="Add to favourites">
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
                                <ToolTip content="More">
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
            <div className="osx-card-content">{content}</div>
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

export default Card;
