/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from 'react';
import ToolTip from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless';
import SwitchOff from '../../SwitchOff';

function Lyrics({ lyrics, title, artists, thumbnail }) {
    const sentences = lyrics.sentences;
    const audio = document.querySelector('.--z--player audio');
    const lyricsListRef = useRef(null);

    const [isVisible, setVisible] = useState(false);
    const [imageEffect, setImageEffect] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [index, setIndex] = useState(0);
    const [time, setTime] = useState();

    const smoothScroll = (target, duration) => {
        const targetPosition = target.offsetTop - lyricsListRef.current.offsetTop;
        const startPosition = lyricsListRef.current.scrollTop;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (!startTime) {
                startTime = currentTime;
            }
            const elapsedTime = currentTime - startTime;
            const run = linear(elapsedTime, startPosition, distance, duration);
            lyricsListRef.current.scrollTop = run;

            if (elapsedTime < duration) {
                requestAnimationFrame(animation);
            }
        };
        const linear = (time, from, distance, duration) => {
            return distance * (time / duration) + from;
        };

        requestAnimationFrame(animation);
    };

    useEffect(() => {
        if (imageEffect) {
            const node = document.querySelector('.fs-background .image-effect ul');
            node.innerHTML = htmlContent;
        }
    }, [htmlContent, imageEffect]);

    useEffect(() => {
        const activeLyric = document.querySelector('.scroll-content .is-active');

        if (activeLyric && lyricsListRef.current) {
            smoothScroll(activeLyric, 500);
        }
    }, [audio.currentTime]);

    useEffect(() => {
        let interval;
        interval = setInterval(() => setTime(Date.now()), 10000);
        setIndex(index + 1);
        setHtmlContent(`<li className="exit"><img alt="" src=${lyrics.defaultIBGUrls[index + 1]}/>`);
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    return (
        <div className="fs-nowplaying osx-video-animation-enter-done">
            <div className="fs-background">
                <div className="video-blur-image">
                    <canvas
                        className="react-blur-canvas"
                        width="1536"
                        height="856"
                        style={{ width: '1536px', height: '856px' }}
                    ></canvas>
                </div>
                <div className="overlay"></div>
                {imageEffect ? (
                    <div className="image-effect is-play">
                        <ul>
                            <li className="exit">{/* <img alt="" src={lyrics.defaultIBGUrls[index]} /> */}</li>
                            <li className="enter">
                                {/* <img ref={enterImgRef} alt="" src={lyrics.defaultIBGUrls[index + 1]} /> */}
                            </li>
                        </ul>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="fs-content">
                <div className="fs-header">
                    <div className="left"></div>
                    <ul className="tabs">
                        <li className="tab-item">Danh sách phát</li>
                        <li className="tab-item">Karaoke</li>
                        <li className="tab-item is-active">Lời bài hát</li>
                    </ul>
                    <div className="level action-group">
                        <div className="level-item">
                            <ToolTip content="Toàn màn hình">
                                <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                                    <i className="icon ic-scale-1"></i>
                                </button>
                            </ToolTip>
                        </div>
                        <div className="level-item">
                            <div className="setting-btn">
                                <Tippy
                                    interactive
                                    visible={isVisible}
                                    onClickOutside={() => setVisible(false)}
                                    render={(attrs) => (
                                        <div {...attrs} className="menu">
                                            <ul className="menu-list">
                                                <li>
                                                    <button className="osx-btn osx-tg-btn button" tabIndex="0">
                                                        Hình nền
                                                        <i
                                                            onClick={() => setImageEffect(!imageEffect)}
                                                            className="icon ic-svg-switch"
                                                        >
                                                            <SwitchOff />
                                                        </i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="osx-btn osx-tg-btn button"
                                                        tabIndex="-1"
                                                        disabled=""
                                                    >
                                                        Chỉ phát nhạc nền
                                                        <i className="icon ic-svg-switch osx-switch-off">
                                                            <SwitchOff />
                                                        </i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="osx-btn size-btn button" tabIndex="0">
                                                        <span>Cỡ chữ lời nhạc</span>
                                                        <div className="sizes">
                                                            <a className="osx-btn size-S active button" tabIndex="0">
                                                                A
                                                            </a>
                                                            <a className="osx-btn size-M button" tabIndex="0">
                                                                A
                                                            </a>
                                                            <a className="osx-btn size-L button" tabIndex="0">
                                                                A
                                                            </a>
                                                        </div>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="osx-btn osx-tg-btn button" tabIndex="0">
                                                        Luôn phát nhạc toàn màn hình
                                                        <i className="icon ic-svg-switch osx-switch-off">
                                                            <SwitchOff />
                                                        </i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                >
                                    <ToolTip content="Cài đặt">
                                        <button
                                            onClick={() => setVisible(!isVisible)}
                                            className="osx-btn osx-tooltip-btn button"
                                            tabIndex="0"
                                        >
                                            <i className="icon ic-settings"></i>
                                        </button>
                                    </ToolTip>
                                </Tippy>
                            </div>
                        </div>
                        <div className="level-item">
                            <ToolTip content="Đóng">
                                <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                                    <i className="icon ic-go-down"></i>
                                </button>
                            </ToolTip>
                        </div>
                    </div>
                </div>
                <div className="fs-body">
                    <div className="fs-lyric">
                        <div className="columns is-multiline">
                            <div className="column is-fullhd-5 is-tablet-0">
                                <div className="song-item">
                                    <div className="cover">
                                        <figure className="image is-48x48">
                                            <img src={thumbnail} alt="" />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <div className="is-size-M column is-fullhd-7 is-tablet-12">
                                <ul ref={lyricsListRef} className="scroll-content">
                                    {sentences.map((sentence, i) => (
                                        <li
                                            key={i}
                                            className={`item ${
                                                audio.currentTime >= sentence.words[0].startTime / 1000 &&
                                                audio.currentTime <=
                                                    sentence.words[sentence.words.length - 1].endTime / 1000
                                                    ? 'is-active'
                                                    : ''
                                            } ${
                                                audio.currentTime >
                                                sentence.words[sentence.words.length - 1].endTime / 1000
                                                    ? 'is-over'
                                                    : ''
                                            }`}
                                        >
                                            {sentence.words.map((word) => word.data).join(' ')}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fs-bottom">
                    <div className="osx-text-transition">
                        <div className="osx-text-transition-content">
                            <span className="osx-text-transition-item">
                                {title} -{' '}
                                <span className="artist">
                                    {artists.map((artist, i) =>
                                        i === artists.length - 1 ? artist.name : `${artist.name}, `,
                                    )}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lyrics;
