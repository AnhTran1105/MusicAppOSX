import ToolTip from '@tippyjs/react';
import axios from '../../utils/axios';

function FavouriteButton({ songId }) {
    const toggleFavorite = (songId) => {
        axios
            .post(
                '/api/toggle-favorite',
                { song_id: songId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {})
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <ToolTip content="Thêm vào thư viện">
                <button
                    onClick={() => {
                        toggleFavorite(songId);

                        localStorage.setItem('songIds', ...songId);
                    }}
                    className="osx-btn osx-tooltip-btn osx-disable-transition active is-hover-circle button"
                    tabIndex="0"
                >
                    <i
                        className={`icon ${
                            localStorage.getItem('songIds')
                                ? localStorage.getItem('songIds').includes(songId)
                                    ? 'ic-like-full'
                                    : 'ic-like'
                                : ''
                        }`}
                        style={{ color: 'rgb(153, 153, 153)' }}
                    ></i>
                </button>
            </ToolTip>
        </>
    );
}

export default FavouriteButton;
