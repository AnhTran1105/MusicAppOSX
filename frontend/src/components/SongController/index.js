import ToolTip from '@tippyjs/react';
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon, RepeatIcon, ShuffleIcon } from '../../icons';
import { FormatTime } from '../../utils/FormatTime';
import { useEffect, useRef, useState } from 'react';

let audio;
function SongController({
    isPlaying,
    onPlayPause,
    onNext,
    onPrevious,
    currentTime,
    duration,
    isRepeating,
    setRepeating,
    isShuffling,
    setShuffling,
}) {
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const progressBarRef = useRef(null);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleSeek = (event) => {
        // Lấy vị trí x của sự kiện tua bài hát trong thanh duration bar
        const seekPositionX = event.clientX;

        // Lấy vị trí x của thanh duration bar
        const progressBarX = event.target.getBoundingClientRect().left;

        // Tính toán phần trăm tiến độ mới dựa trên vị trí tua bài hát
        const newProgress = ((seekPositionX - progressBarX) / event.target.offsetWidth) * 100;

        // Cập nhật giá trị progress và currentTime
        setProgress(newProgress);
        currentTime = (duration / 100) * newProgress;
        audio.currentTime = currentTime;
    };

    useEffect(() => {
        audio = document.querySelector('.--z--player audio');
    }, []);

    useEffect(() => {
        setProgress((currentTime / duration) * 100);
    }, [currentTime, duration]);

    return (
        <div className="player-controls__player-bar level-center">
            <div className="level-item">
                <div className="actions">
                    <ToolTip content={isShuffling ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}>
                        <button
                            className="osx-btn osx-tooltip-btn btn-shuffle is-hover-circle button"
                            tabIndex="0"
                            style={{ margin: '0 24px' }}
                            onClick={() => setShuffling(!isShuffling)}
                        >
                            <i className="icon">
                                <ShuffleIcon color={isShuffling ? '#f55874' : '#999999'} />
                            </i>
                        </button>
                    </ToolTip>
                    <ToolTip content="Bài trước">
                        <button
                            className="osx-btn osx-tooltip-btn btn-pre is-hover-circle button"
                            onClick={onPrevious}
                            tabIndex="0"
                        >
                            <i className="icon">
                                <PreviousIcon />
                            </i>
                        </button>
                    </ToolTip>
                    <button
                        className={`osx-btn osx-tooltip-btn ${isPlaying ? 'btn-pause' : 'btn-play'} button`}
                        onClick={onPlayPause}
                        tabIndex="0"
                    >
                        <i className="icon">{isPlaying ? <PauseIcon /> : <PlayIcon />}</i>
                    </button>
                    <ToolTip content="Bài kế tiếp">
                        <button
                            className="osx-btn osx-tooltip-btn btn-next is-hover-circle button"
                            onClick={onNext}
                            tabIndex="0"
                        >
                            <i className="icon">
                                <NextIcon />
                            </i>
                        </button>
                    </ToolTip>
                    <ToolTip content={isRepeating ? 'Tắt phát lại tất cả' : 'Bật phát lại tất cả'}>
                        <button
                            className="osx-btn osx-tooltip-btn btn-repeat is-hover-circle button"
                            tabIndex="0"
                            style={{ margin: '0 26px' }}
                            onClick={() => setRepeating(!isRepeating)}
                        >
                            <i className="icon">
                                <RepeatIcon color={isRepeating ? '#f55874' : '#999999'} />
                            </i>
                        </button>
                    </ToolTip>
                </div>
            </div>
            <div className="level-item">
                <span className="time left">{FormatTime(currentTime)}</span>
                <div className="osx-duration-bar" onClick={handleSeek} onMouseDown={(e) => e.preventDefault()}>
                    <div
                        className="osx-slider-bar"
                        style={{
                            background: `linear-gradient(to right, var(--progressbar-active-bg) 0%, var(--progressbar-active-bg) ${progress}%, var(--progressbar-player-bg) ${progress}%, var(--progressbar-player-bg) 100%)`,
                            alignSelf: 'center',
                        }}
                        ref={progressBarRef}
                    >
                        <div
                            className="osx-slider-handle"
                            onMouseDown={handleDragStart}
                            onMouseUp={handleDragEnd}
                            style={{
                                transform: `translate(${
                                    (progress * progressBarRef.current.offsetWidth) / 100 - 1
                                }px, -3.5px)`,
                                borderRadius: '50%',
                                backgroundColor: 'var(--progressbar-active-bg)',
                            }}
                        ></div>
                    </div>
                </div>

                <span className="time right">{FormatTime(duration)}</span>
            </div>
        </div>
    );
}

export default SongController;
