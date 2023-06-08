import { SET_SONG_ID, SET_SONG_SOURCE, SET_SONG_STATUS, SET_SONG_LIST, SET_LOGGED_IN } from './constants';

const initState = {
    songId: '',
    songSrc: '',
    songStatus: 'pause',
    songList: [],
    loggedIn: false,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SONG_ID:
            return {
                ...state,
                songId: action.payload,
            };
        case SET_SONG_SOURCE:
            return {
                ...state,
                songSrc: action.payload,
            };

        case SET_SONG_STATUS:
            return {
                ...state,
                songStatus: action.payload,
            };
        case SET_SONG_LIST:
            return {
                ...state,
                songList: action.payload,
            };
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload,
            };

        default:
            throw new Error('Invalid action.');
    }
}

export { initState };
export default reducer;
