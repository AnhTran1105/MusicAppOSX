import { SET_SONG_ID, SET_SONG_STATUS, SET_SONG_SOURCE, SET_SONG_LIST, SET_LOGGED_IN } from './constants';

export const setSongId = (payload) => ({
    type: SET_SONG_ID,
    payload,
});

export const setSongSrc = (payload) => ({
    type: SET_SONG_SOURCE,
    payload,
});

export const setSongStatus = (payload) => ({
    type: SET_SONG_STATUS,
    payload,
});

export const setSongList = (payload) => ({
    type: SET_SONG_LIST,
    payload,
});

export const setLoggedIn = (payload) => ({
    type: SET_LOGGED_IN,
    payload,
});
