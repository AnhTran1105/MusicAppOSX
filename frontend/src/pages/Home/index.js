import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Playlist from '../../sections/Playlist';

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/playlist_tracks/');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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
                    <div className="container">
                        <Playlist />
                        {/* {data ? (
                            <ul>
                                {data.tracks.map((track) => (
                                    <li key={track.id}>{track.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading...</p>
                        )} */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
