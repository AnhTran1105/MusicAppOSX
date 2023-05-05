import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://spotify23.p.rapidapi.com/tracks/', {
                params: { ids: '4WNcduiCmDNfmTEz7JvmLv' },
                headers: {
                    'X-RapidAPI-Key': '669b3a58ddmsh6c08f304c816a2fp1be6dbjsn6a0d15230b08',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
                },
            });
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
                        {data ? (
                            <ul>
                                {data.tracks.map((track) => (
                                    <li key={track.id}>{track.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
