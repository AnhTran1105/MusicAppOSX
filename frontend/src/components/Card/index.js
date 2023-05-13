import ToolTip from '@tippyjs/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Card({ imgSize, imgSrc, title, href, sortDescription, cardTitle, artists }) {
    return (
        <div className="osx-card">
            <div>
                <Link className="" title={title} to={href}>
                    <div className="osx-card-image">
                        <figure className={`image is-${imgSize}`}>
                            <img src={imgSrc} alt="" />
                        </figure>
                        <div className="opacity "></div>
                        <div className="osx-actions-container">
                            <div className="osx-box osx-actions playlist-actions">
                                <ToolTip content="Add to favourites">
                                    <button
                                        className="osx-btn osx-tooltip-btn animation-like active is-hover-circle button"
                                        tabIndex="0"
                                    >
                                        <i className="icon ic-like"></i>
                                        <i className="icon ic-like-full"></i>
                                    </button>
                                </ToolTip>
                                <button className="osx-btn action-play button" tabIndex="0">
                                    <i className="icon action-play ic-svg-play-circle"></i>
                                </button>
                                <ToolTip content="More">
                                    <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                                        <i className="icon ic-more"></i>
                                    </button>
                                </ToolTip>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="osx-card-content">
                {cardTitle ? (
                    <>
                        <h4 className="title is-6">
                            <a className="" title={title} href={href}>
                                <span>
                                    <span>
                                        <span>
                                            <span>{title}</span>
                                        </span>
                                    </span>
                                    <span
                                        style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}
                                    ></span>
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
                                <span
                                    style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}
                                ></span>
                            </span>
                        </h3>
                    </>
                ) : (
                    <h3 className="mt-10 subtitle">
                        <span>
                            <span>{sortDescription}</span>
                            <span style={{ position: 'fixed', visibility: 'hidden', top: '0px', left: '0px' }}>…</span>
                        </span>
                    </h3>
                )}
            </div>
        </div>
    );
}

export default Card;
