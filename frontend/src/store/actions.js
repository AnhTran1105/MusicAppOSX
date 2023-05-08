import { SET_SONG_ID, SET_SONG_STATUS } from './constants';
import { SET_SONG_SOURCE } from './constants';

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
