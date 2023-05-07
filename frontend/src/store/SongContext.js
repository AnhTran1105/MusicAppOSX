import { useState, createContext } from 'react';

const SongContext = createContext();

function SongProvider({ children }) {
    const [songId, setSongId] = useState();

    return <SongContext.Provider value={{ songId, setSongId }}>{children}</SongContext.Provider>;
}

export { SongContext, SongProvider };
