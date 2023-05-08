import ToolTip from '@tippyjs/react';
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon, RepeatIcon, ShuffleIcon } from '../../icons';

function SongController({
    isPlaying,
    onPlayPause,
    onNext,
    onPrevious,
    onSeek,
    onShuffle,
    onRepeat,
    currentTime,
    duration,
}) {
    const handleSeek = (event) => {
        const seekTime = parseFloat(event.target.value);
        onSeek(seekTime);
    };

    const progress = (currentTime / duration) * 100;

    return (
        <div className="player-controls__player-bar level-center">
            <div className="level-item">
                <div className="actions">
                    <ToolTip content="Shuffle playlist">
                        <button
                            className="osx-btn osx-tooltip-btn btn-shuffle is-hover-circle button"
                            tabIndex="0"
                            style={{ margin: '0 24px' }}
                            onClick={onShuffle}
                        >
                            <i className="icon">
                                <ShuffleIcon color={onShuffle ? '#f55874' : '#999999'} />
                            </i>
                        </button>
                    </ToolTip>
                    <ToolTip content="Previous song">
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
                        <i className="icon">{isPlaying ? <PlayIcon /> : <PauseIcon />}</i>
                    </button>
                    <button
                        className="osx-btn osx-tooltip-btn btn-next is-hover-circle button"
                        onClick={onNext}
                        tabIndex="0"
                    >
                        <i className="icon">
                            <NextIcon />
                        </i>
                    </button>
                    <ToolTip content="Put song on repeat">
                        <button
                            className="osx-btn osx-tooltip-btn btn-repeat is-hover-circle button"
                            tabIndex="0"
                            style={{ margin: '0 26px' }}
                            onClick={onRepeat}
                        >
                            <i className="icon">
                                <RepeatIcon color={onRepeat ? '#f55874' : '#999999'} />
                            </i>
                        </button>
                    </ToolTip>
                </div>
            </div>
            <div className="level-item">
                <span className="time left">01:07</span>
                <div className="osx-duration-bar">
                    <div
                        className="osx-slider-bar"
                        style={{
                            background: `linear-gradient(to right, var(--progressbar-active-bg) 0%, var(--progressbar-active-bg) ${progress}%, var(--progressbar-player-bg) ${progress}%, var(--progressbar-player-bg) 100%)`,
                            alignSelf: 'center',
                        }}
                    >
                        <div
                            tabIndex="0"
                            aria-valuemax={duration}
                            aria-valuemin="0"
                            aria-valuenow={currentTime}
                            draggable="false"
                            role="slider"
                            className="osx-slider-handle"
                            style={{
                                borderRadius: '50%',
                                backgroundColor: 'var(--progressbar-active-bg)',
                                transform: `translateX(${progress}%)`,
                            }}
                        ></div>
                    </div>
                </div>
                <span className="time right">04:00</span>
            </div>
        </div>
    );
}

export default SongController;
