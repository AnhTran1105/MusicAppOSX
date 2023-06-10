import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect, useRef } from 'react';
import SongItem from '../../components/SongItem/SongItem';
import { Link } from 'react-router-dom';
import Playlist from '../../sections/Playlist';
import ToolTip from '@tippyjs/react';
import Artist from '../../sections/Artist';
import { parse } from 'node-html-parser';
import MV from '../../sections/MV';
import numberWithComma from '../../utils/numberWithComma';

function ArtistDetail() {
    const [data, setData] = useState(null);
    const { alias } = useParams();
    const [isBusy, setBusy] = useState(true);
    const playlistWrapperRef = useRef();
    const cardImageRef = useRef();

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

    const hasCoverThumbnail = (coverUrl) => {
        const startIndex = coverUrl.lastIndexOf('/') + 1;
        const defaultCover = coverUrl.substring(startIndex);
        return defaultCover;
    };

    useEffect(() => {
        if (!isBusy && data.topAlbum) {
            playlistWrapperRef.current.addEventListener('mouseenter', () => {
                cardImageRef.current.classList.add('active');
                playlistWrapperRef.current.classList.add('hover');
            });
            playlistWrapperRef.current.addEventListener('mouseleave', () => {
                cardImageRef.current.classList.remove('active');
                playlistWrapperRef.current.classList.remove('hover');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBusy]);

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
                            {hasCoverThumbnail(data.cover) === 'default_cover.png' ? (
                                <div className="artist-hero">
                                    <div className="blur-container" style={{ left: '-118px', right: '-118px' }}>
                                        <div
                                            className="blur"
                                            style={{
                                                backgroundImage: `url(${data.thumbnailM})`,
                                            }}
                                        ></div>
                                        <div className="bg-alpha"></div>
                                    </div>
                                    <div className="container hero-body">
                                        <div className="left">
                                            <figure className="image avatar is-48x48">
                                                <img src={data.thumbnail} alt="" />
                                            </figure>
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
                                                        {numberWithComma(data.totalFollow)} người quan tâm
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
                                        {data.spotlight ? (
                                            <div className="awards color-white mar-l-36">
                                                <i className="icon zing-choice-award">
                                                    <svg width="100%" height="100%" viewBox="0 0 56 40">
                                                        <path
                                                            fill="currentColor"
                                                            d="M21.343 33.177c.678 0 1.253.152 1.725.454.472.303.813.72 1.023 1.253l-1.186.484c-.29-.661-.82-.992-1.586-.992-.339 0-.652.087-.938.26-.287.174-.513.418-.678.732-.166.315-.248.678-.248 1.09 0 .412.082.775.248 1.09.165.314.391.559.678.732.286.174.599.26.938.26.387 0 .72-.086.999-.26.278-.173.494-.426.647-.757l1.175.509c-.242.525-.602.94-1.078 1.247-.476.307-1.049.46-1.719.46-.613 0-1.162-.141-1.646-.424-.485-.282-.862-.672-1.132-1.168-.27-.496-.406-1.06-.406-1.689 0-.63.135-1.192.406-1.689.27-.496.647-.886 1.132-1.168.484-.283 1.033-.424 1.646-.424zm13.874 0c.613 0 1.166.146 1.659.436.492.29.875.686 1.15 1.186.274.5.411 1.054.411 1.66 0 .612-.137 1.17-.411 1.67-.275.5-.656.894-1.144 1.18-.489.287-1.043.43-1.665.43-.621 0-1.178-.143-1.67-.43-.493-.286-.876-.68-1.15-1.18-.275-.5-.412-1.058-.412-1.67 0-.614.137-1.171.411-1.672.275-.5.658-.893 1.15-1.18.493-.287 1.05-.43 1.671-.43zm10.303 0c.678 0 1.253.152 1.725.454.472.303.813.72 1.023 1.253l-1.187.484c-.29-.661-.819-.992-1.586-.992-.339 0-.651.087-.938.26-.286.174-.512.418-.678.732-.165.315-.248.678-.248 1.09 0 .412.083.775.248 1.09.166.314.392.559.678.732.287.174.6.26.938.26.388 0 .72-.086 1-.26.278-.173.494-.426.647-.757l1.174.509c-.242.525-.601.94-1.077 1.247-.476.307-1.05.46-1.72.46-.613 0-1.162-.141-1.646-.424-.484-.282-.861-.672-1.132-1.168-.27-.496-.405-1.06-.405-1.689 0-.63.135-1.192.405-1.689.27-.496.648-.886 1.132-1.168.484-.283 1.033-.424 1.647-.424zm6.658 0c.622 0 1.158.135 1.61.406.452.27.797.643 1.035 1.12.239.476.358 1.017.358 1.622 0 .161-.009.299-.025.412h-4.77c.057.589.267 1.043.63 1.361.363.32.787.479 1.271.479.396 0 .735-.091 1.017-.273.283-.181.509-.421.678-.72l1.077.52c-.282.509-.657.909-1.125 1.2-.469.29-1.03.435-1.683.435-.597 0-1.136-.141-1.616-.424-.48-.282-.856-.672-1.126-1.168-.27-.496-.406-1.055-.406-1.677 0-.589.131-1.136.394-1.64.262-.505.627-.906 1.095-1.205.468-.298.997-.448 1.586-.448zm-25.617-2.3v2.373l-.073.968h.073c.178-.306.442-.557.793-.75.351-.194.736-.29 1.156-.29.75 0 1.324.223 1.72.671.395.448.592 1.047.592 1.798v3.898h-1.295v-3.729c0-.476-.127-.835-.381-1.077-.255-.242-.58-.363-.975-.363-.298 0-.57.087-.817.26-.246.174-.44.406-.581.696-.141.29-.212.597-.212.92v3.293h-1.307v-8.668h1.307zm14.48 2.494v6.174h-1.308v-6.174h1.307zM21.491 0l5.573 14.824h15.471l-5.16 4.052h-10.31L22.891 8.805l-3.874 10.071H8.27l8.155 7.153-2.948 9.854-5.207 3.654 4.073-15.08L0 14.824h16.426L21.492 0zm13.725 34.376c-.347 0-.668.085-.962.254-.295.17-.531.412-.709.726-.177.315-.266.682-.266 1.102 0 .42.089.787.266 1.102.178.315.414.557.709.726.294.17.615.254.962.254s.666-.084.956-.254c.291-.17.525-.411.703-.726.177-.315.266-.682.266-1.102 0-.42-.089-.787-.266-1.102-.178-.314-.412-.557-.703-.726-.29-.17-.609-.254-.956-.254zm16.973-.085c-.436 0-.805.133-1.107.4-.303.266-.511.621-.624 1.065h3.426c-.016-.226-.089-.452-.218-.678-.129-.226-.317-.414-.563-.563-.246-.15-.55-.224-.914-.224zm-11.803-3.583c.242 0 .45.084.623.254.174.17.26.375.26.617s-.086.45-.26.624c-.174.173-.381.26-.623.26-.243 0-.45-.087-.624-.26-.173-.174-.26-.382-.26-.624s.087-.448.26-.617c.174-.17.381-.254.624-.254zm1.634-9.295c.662 0 1.271.117 1.828.35.557.235 1.029.562 1.416.981l-.92.92c-.589-.661-1.364-.992-2.324-.992-.565 0-1.094.135-1.586.405s-.884.656-1.174 1.156c-.29.5-.436 1.07-.436 1.707 0 .646.147 1.217.442 1.713.294.497.686.88 1.174 1.15.488.271 1.019.406 1.592.406.912 0 1.655-.286 2.228-.86.185-.177.34-.403.466-.677.125-.275.212-.577.26-.908h-2.978v-1.175h4.213c.048.275.072.509.072.703 0 .548-.086 1.07-.26 1.567-.173.497-.442.935-.805 1.314-.387.42-.851.74-1.392.962-.54.222-1.146.333-1.816.333-.823 0-1.582-.198-2.276-.593-.694-.395-1.245-.938-1.653-1.628-.407-.69-.611-1.46-.611-2.307s.204-1.616.611-2.306c.408-.69.959-1.233 1.653-1.628.694-.396 1.453-.593 2.276-.593zm-17.76.193v1.356l-4.504 6.053h4.552v1.26h-6.126v-1.356l4.54-6.054h-4.346v-1.259h5.884zm2.93 0v8.669h-1.332v-8.669h1.332zm3.523 0l3.922 6.368h.073l-.073-1.67v-4.698h1.32v8.669h-1.38l-4.117-6.695h-.072l.072 1.67v5.025h-1.32v-8.669h1.575z"
                                                        ></path>
                                                    </svg>
                                                </i>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="artist-hero has-cover">
                                    <div
                                        className="artist-cover"
                                        style={{
                                            left: '-118px',
                                            right: '-118px',
                                            backgroundImage: `url(${data.cover})`,
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
                                                        {numberWithComma(data.totalFollow)} người quan tâm
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
                            )}

                            <div className="artist-home-content">
                                <div className="top-section-container">
                                    {data.topAlbum ? (
                                        <div className="latest-section">
                                            <div className="container">
                                                <h3 className="osx-section-title title is-2">Mới phát hành</h3>
                                                <Link className="" title={data.topAlbum.title} to={data.topAlbum.link}>
                                                    <div
                                                        ref={playlistWrapperRef}
                                                        className="playlist-wrapper is-normal allow-click"
                                                    >
                                                        <div className="osx-card">
                                                            <div ref={cardImageRef} className="osx-card-image">
                                                                <figure className="image is-48x48">
                                                                    <img src={data.topAlbum.thumbnailM} alt="" />
                                                                </figure>
                                                                <div className="opacity "></div>
                                                                <div className="osx-actions-container">
                                                                    <div className="osx-box osx-actions playlist-actions">
                                                                        <button
                                                                            className="osx-btn osx-tooltip-btn animation-like active is-hover-circle button"
                                                                            tabIndex="0"
                                                                        >
                                                                            <i className="icon ic-like"></i>
                                                                            <i className="icon ic-like-full"></i>
                                                                        </button>
                                                                        <button
                                                                            className="osx-btn action-play button"
                                                                            tabIndex="0"
                                                                        >
                                                                            <i className="icon action-play ic-svg-play-circle"></i>
                                                                        </button>
                                                                        <button
                                                                            className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                            tabIndex="0"
                                                                        >
                                                                            <i className="icon ic-more"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="osx-card-content">
                                                                <span>Single</span>
                                                                <h3 className="title">
                                                                    <span>
                                                                        <span>
                                                                            <span>{data.topAlbum.title}</span>
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
                                                                        <Link
                                                                            className="is-ghost"
                                                                            to={data.topAlbum.artists[0].link}
                                                                        >
                                                                            {data.topAlbum.artists[0].name}
                                                                        </Link>
                                                                    </h3>
                                                                </span>
                                                                <span>{data.topAlbum.releaseDate}</span>
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
                                    ) : (
                                        ''
                                    )}

                                    <div className="container">
                                        <h3 className="osx-section-title title is-2">
                                            {data.sections.filter((section) => section.sectionType === 'song')[0].title}
                                            <Link
                                                className="discovery-btn"
                                                to={
                                                    data.sections.filter((section) => section.sectionType === 'song')[0]
                                                        .link
                                                }
                                            >
                                                Tất cả <i className="icon ic-go-right"></i>
                                            </Link>
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
                                {data.sections
                                    .filter((section) => section.sectionType === 'playlist')
                                    .map(
                                        (section, index) =>
                                            section && (
                                                <Playlist
                                                    key={index}
                                                    props={section.items}
                                                    sectionTitle={section.title}
                                                    sectionLink={section.link}
                                                    cardTitle={section.itemType ? true : false}
                                                />
                                            ),
                                    )}
                                {data.sections
                                    .filter((section) => section.sectionType === 'video')
                                    .map(
                                        (section, index) =>
                                            section && (
                                                <MV
                                                    key={index}
                                                    props={section.items}
                                                    sectionTitle={section.title}
                                                    sectionLink={section.link}
                                                    cardTitle={section.itemType ? true : false}
                                                    ArtistImg={data.thumbnail}
                                                />
                                            ),
                                    )}

                                {data.sections
                                    .filter((section) => section.sectionType === 'artist')
                                    .map(
                                        (section, index) =>
                                            section && (
                                                <Artist
                                                    key={index}
                                                    props={section.items}
                                                    cardTitle={section.itemType ? true : false}
                                                    artistSection={true}
                                                />
                                            ),
                                    )}

                                <div className="osx-section channel-section">
                                    <div className="container artist-biography" style={{ width: '942.4px' }}>
                                        <h3 className="osx-section-title title is-2">Về {data.name}</h3>
                                        <div className="content">
                                            <div className="left" style={{ width: '456.199px', height: '304.133px' }}>
                                                <figure className="image is-48x48">
                                                    <img src={data.thumbnailM} alt="" />
                                                </figure>
                                            </div>
                                            <div className="right">
                                                <div className="description">
                                                    <span>
                                                        <span>{parse(data.biography).textContent}</span>
                                                        <span
                                                            style={{
                                                                position: 'fixed',
                                                                visibility: 'hidden',
                                                                top: '0px',
                                                                left: '0px',
                                                            }}
                                                        >
                                                            <span>... </span>
                                                            <span
                                                                className="read-more"
                                                                style={{ color: 'var(--text-item-hover)' }}
                                                            >
                                                                Xem thêm
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="statistic">
                                                    <div className="numb-follow">
                                                        <h3 className="title">{numberWithComma(data.totalFollow)}</h3>
                                                        <h3 className="subtitle">Người quan tâm</h3>
                                                    </div>
                                                    {data.spotlight === true ? (
                                                        <div className="awards">
                                                            <i className="icon">
                                                                <svg
                                                                    width="100%"
                                                                    height="100%"
                                                                    viewBox="0 0 56 40"
                                                                    className="zing-choice-award"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M21.343 33.177c.678 0 1.253.152 1.725.454.472.303.813.72 1.023 1.253l-1.186.484c-.29-.661-.82-.992-1.586-.992-.339 0-.652.087-.938.26-.287.174-.513.418-.678.732-.166.315-.248.678-.248 1.09 0 .412.082.775.248 1.09.165.314.391.559.678.732.286.174.599.26.938.26.387 0 .72-.086.999-.26.278-.173.494-.426.647-.757l1.175.509c-.242.525-.602.94-1.078 1.247-.476.307-1.049.46-1.719.46-.613 0-1.162-.141-1.646-.424-.485-.282-.862-.672-1.132-1.168-.27-.496-.406-1.06-.406-1.689 0-.63.135-1.192.406-1.689.27-.496.647-.886 1.132-1.168.484-.283 1.033-.424 1.646-.424zm13.874 0c.613 0 1.166.146 1.659.436.492.29.875.686 1.15 1.186.274.5.411 1.054.411 1.66 0 .612-.137 1.17-.411 1.67-.275.5-.656.894-1.144 1.18-.489.287-1.043.43-1.665.43-.621 0-1.178-.143-1.67-.43-.493-.286-.876-.68-1.15-1.18-.275-.5-.412-1.058-.412-1.67 0-.614.137-1.171.411-1.672.275-.5.658-.893 1.15-1.18.493-.287 1.05-.43 1.671-.43zm10.303 0c.678 0 1.253.152 1.725.454.472.303.813.72 1.023 1.253l-1.187.484c-.29-.661-.819-.992-1.586-.992-.339 0-.651.087-.938.26-.286.174-.512.418-.678.732-.165.315-.248.678-.248 1.09 0 .412.083.775.248 1.09.166.314.392.559.678.732.287.174.6.26.938.26.388 0 .72-.086 1-.26.278-.173.494-.426.647-.757l1.174.509c-.242.525-.601.94-1.077 1.247-.476.307-1.05.46-1.72.46-.613 0-1.162-.141-1.646-.424-.484-.282-.861-.672-1.132-1.168-.27-.496-.405-1.06-.405-1.689 0-.63.135-1.192.405-1.689.27-.496.648-.886 1.132-1.168.484-.283 1.033-.424 1.647-.424zm6.658 0c.622 0 1.158.135 1.61.406.452.27.797.643 1.035 1.12.239.476.358 1.017.358 1.622 0 .161-.009.299-.025.412h-4.77c.057.589.267 1.043.63 1.361.363.32.787.479 1.271.479.396 0 .735-.091 1.017-.273.283-.181.509-.421.678-.72l1.077.52c-.282.509-.657.909-1.125 1.2-.469.29-1.03.435-1.683.435-.597 0-1.136-.141-1.616-.424-.48-.282-.856-.672-1.126-1.168-.27-.496-.406-1.055-.406-1.677 0-.589.131-1.136.394-1.64.262-.505.627-.906 1.095-1.205.468-.298.997-.448 1.586-.448osx-25.617-2.3v2.373l-.073.968h.073c.178-.306.442-.557.793-.75.351-.194.736-.29 1.156-.29.75 0 1.324.223 1.72.671.395.448.592 1.047.592 1.798v3.898h-1.295v-3.729c0-.476-.127-.835-.381-1.077-.255-.242-.58-.363-.975-.363-.298 0-.57.087-.817.26-.246.174-.44.406-.581.696-.141.29-.212.597-.212.92v3.293h-1.307v-8.668h1.307zm14.48 2.494v6.174h-1.308v-6.174h1.307zM21.491 0l5.573 14.824h15.471l-5.16 4.052h-10.31L22.891 8.805l-3.874 10.071H8.27l8.155 7.153-2.948 9.854-5.207 3.654 4.073-15.08L0 14.824h16.426L21.492 0zm13.725 34.376c-.347 0-.668.085-.962.254-.295.17-.531.412-.709.726-.177.315-.266.682-.266 1.102 0 .42.089.787.266 1.102.178.315.414.557.709.726.294.17.615.254.962.254s.666-.084.956-.254c.291-.17.525-.411.703-.726.177-.315.266-.682.266-1.102 0-.42-.089-.787-.266-1.102-.178-.314-.412-.557-.703-.726-.29-.17-.609-.254-.956-.254zm16.973-.085c-.436 0-.805.133-1.107.4-.303.266-.511.621-.624 1.065h3.426c-.016-.226-.089-.452-.218-.678-.129-.226-.317-.414-.563-.563-.246-.15-.55-.224-.914-.224osx-11.803-3.583c.242 0 .45.084.623.254.174.17.26.375.26.617s-.086.45-.26.624c-.174.173-.381.26-.623.26-.243 0-.45-.087-.624-.26-.173-.174-.26-.382-.26-.624s.087-.448.26-.617c.174-.17.381-.254.624-.254zm1.634-9.295c.662 0 1.271.117 1.828.35.557.235 1.029.562 1.416.981l-.92.92c-.589-.661-1.364-.992-2.324-.992-.565 0-1.094.135-1.586.405s-.884.656-1.174 1.156c-.29.5-.436 1.07-.436 1.707 0 .646.147 1.217.442 1.713.294.497.686.88 1.174 1.15.488.271 1.019.406 1.592.406.912 0 1.655-.286 2.228-.86.185-.177.34-.403.466-.677.125-.275.212-.577.26-.908h-2.978v-1.175h4.213c.048.275.072.509.072.703 0 .548-.086 1.07-.26 1.567-.173.497-.442.935-.805 1.314-.387.42-.851.74-1.392.962-.54.222-1.146.333-1.816.333-.823 0-1.582-.198-2.276-.593-.694-.395-1.245-.938-1.653-1.628-.407-.69-.611-1.46-.611-2.307s.204-1.616.611-2.306c.408-.69.959-1.233 1.653-1.628.694-.396 1.453-.593 2.276-.593osx-17.76.193v1.356l-4.504 6.053h4.552v1.26h-6.126v-1.356l4.54-6.054h-4.346v-1.259h5.884zm2.93 0v8.669h-1.332v-8.669h1.332zm3.523 0l3.922 6.368h.073l-.073-1.67v-4.698h1.32v8.669h-1.38l-4.117-6.695h-.072l.072 1.67v5.025h-1.32v-8.669h1.575z"
                                                                    ></path>
                                                                </svg>
                                                            </i>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {data.awards ? (
                                                        <>
                                                            <div className="numb-awards">
                                                                <h3 className="title">{data.awards.length}</h3>
                                                                <h3 className="subtitle">Giải thưởng</h3>
                                                            </div>
                                                            <div className="awards">
                                                                <div className="zma-wrapper">
                                                                    <ToolTip
                                                                        content={
                                                                            <pre
                                                                                style={{
                                                                                    whiteSpace: 'pre-wrap',
                                                                                    margin: 0,
                                                                                    textAlign: 'left',
                                                                                }}
                                                                            >
                                                                                {data.awards
                                                                                    .map((award) => `${award}\n`)
                                                                                    .join('')}
                                                                            </pre>
                                                                        }
                                                                    >
                                                                        <button
                                                                            className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                            tabIndex="0"
                                                                        >
                                                                            <i className="icon">
                                                                                <svg
                                                                                    width="100%"
                                                                                    height="100%"
                                                                                    viewBox="0 0 38 40"
                                                                                >
                                                                                    <g fill="none" fillRule="evenodd">
                                                                                        <path
                                                                                            fill="currentColor"
                                                                                            d="M37.838 0v40H0V0h37.838zM6.645 30.47L5 33.778l3.307-.008-1.662-3.298zm11.905 0l-2.307 1.66 2.315 1.647-.008-3.306osx-2.317 0l-.32.001.01 3.306h.32l-.01-3.306osx-6.344 0h-.26l.942 3.307h.297l.913-2.98.91 2.98h.296l.941-3.306h-.26l-.834 2.97-.909-2.97h-.292l-.904 2.97-.84-2.97zm12.254 0h-1.27v3.307h.244v-1.355h1.017l.773 1.355h.28l-.8-1.388c.207-.057.373-.17.506-.345.133-.175.203-.374.203-.596 0-.269-.092-.496-.281-.69-.189-.193-.41-.287-.672-.287zm4.349 0h-1.32v3.307h1.32c.477 0 .873-.16 1.184-.477.316-.32.472-.713.472-1.176 0-.463-.156-.855-.472-1.172-.311-.32-.707-.481-1.184-.481zm4.457 0c-.29 0-.528.078-.724.239-.19.155-.286.361-.286.623 0 .16.053.293.11.389.057.092.205.192.295.247.043.028.114.06.205.096l.21.078.238.074c.295.091.514.183.652.279.138.096.21.229.21.408 0 .38-.3.64-.838.64-.534 0-.881-.247-1-.645l-.22.124c.153.462.605.755 1.22.755.328 0 .595-.077.795-.238.2-.16.3-.375.3-.641 0-.261-.1-.458-.343-.6-.119-.073-.229-.128-.333-.17-.1-.04-.243-.091-.429-.15-.29-.092-.495-.18-.624-.266-.128-.087-.19-.216-.19-.39 0-.361.295-.618.752-.618.414 0 .7.183.857.554l.215-.114c-.172-.399-.553-.673-1.072-.673osx-4.457.237c.406 0 .742.137 1.003.41.261.27.392.606.392 1.007 0 .402-.13.737-.392 1.011-.26.27-.597.406-1.003.406h-1.054v-2.834osx-4.349 0c.198 0 .364.07.502.217s.207.321.207.524c0 .204-.07.378-.207.525-.138.142-.304.212-.502.212h-1.026v-1.478zm3.029-7.511h-1.323v6.283h1.323v-6.283osx-18.87 0H5v6.283h1.266v-4.066l1.807 2.908h.147l1.807-2.917v4.075h1.256v-6.283H9.981l-1.835 2.97-1.844-2.97zm22.939 0c-.888 0-1.623.302-2.206.906-.584.595-.871 1.346-.871 2.235 0 .89.287 1.631.87 2.235.584.605 1.32.907 2.207.907 1.082 0 2.037-.553 2.544-1.424l-1.006-.596c-.279.527-.862.854-1.538.854-.575 0-1.04-.18-1.395-.552-.347-.37-.524-.846-.524-1.424 0-.587.177-1.062.524-1.433.355-.37.82-.552 1.395-.552.676 0 1.242.32 1.538.863l1.006-.595c-.507-.872-1.47-1.424-2.544-1.424osx-9.078 0c-.551 0-1.032.164-1.426.492-.394.319-.587.759-.587 1.303 0 .552.202.966.578 1.243.385.267.718.396 1.269.56.499.139.84.268 1.033.389.192.112.289.276.289.492 0 .371-.307.638-.98.638-.701 0-1.173-.31-1.41-.923l-1.032.596c.341.923 1.19 1.493 2.406 1.493.657 0 1.19-.164 1.602-.492.411-.328.621-.768.621-1.33 0-.345-.096-.647-.227-.854-.114-.207-.394-.423-.578-.535-.087-.06-.219-.12-.385-.181-.166-.07-.298-.121-.394-.147l-.42-.138c-.455-.138-.761-.268-.927-.38-.158-.12-.237-.276-.237-.466 0-.354.306-.604.805-.604.534 0 .928.259 1.173.777l1.015-.579c-.42-.854-1.199-1.354-2.188-1.354osx-6.372 0h-1.185v4.144c0 .651.216 1.17.649 1.558.432.387.986.58 1.661.58.684 0 1.238-.193 1.67-.58.433-.388.65-.907.65-1.558v-4.144H16.04v4.047c0 .643-.355 1.048-1.125 1.048s-1.125-.405-1.125-1.048v-4.047zM11.614 6.33H5.218v2.095h3.973L5 19.908v1.965h6.614v-2.096H7.336L11.614 8.1V6.33zm3.307 0h-2.315v15.542h2.315V6.33zm2.863 0h-2.202v15.542h2.274V12.53l3.505 9.343h2.157V6.33h-2.274v9.364l-3.46-9.364zM28.314 6c-1.01 0-1.877.314-2.603.943-.8.716-1.2 1.673-1.2 2.872v8.243c0 1.199.4 2.149 1.2 2.85.726.644 1.594.965 2.602.965 1.008 0 1.876-.321 2.602-.965.8-.701 1.201-1.651 1.201-2.85v-4.91h-4.07v1.972h1.802v2.938c0 .512-.145.903-.434 1.173-.289.27-.656.406-1.1.406-.446 0-.801-.132-1.068-.395-.312-.277-.467-.672-.467-1.184V9.815c0-.512.155-.906.467-1.184.267-.263.622-.395 1.067-.395.445 0 .812.135 1.101.406.29.27.434.661.434 1.173v.789h2.268v-.79c0-1.198-.4-2.155-1.2-2.871C30.188 6.314 29.32 6 28.312 6z"
                                                                                        ></path>
                                                                                    </g>
                                                                                </svg>
                                                                            </i>
                                                                        </button>
                                                                    </ToolTip>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
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

export default ArtistDetail;
