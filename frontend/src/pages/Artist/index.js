import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import FormatNumber from '../../utils/FormatNumber';

function Artist() {
    const [data, setData] = useState(null);
    const { alias } = useParams();
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        if (alias) {
            (async () => {
                try {
                    setData(await getArtist(alias));
                    setBusy(false);
                } catch (error) {
                    console.error('Error fetching song info and song source:', error);
                }
            })();
        }
    }, [alias]);

    const getArtist = async (alias) => {
        try {
            const response = await axios.get(`get-artist/?name=${alias}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {}, [isBusy]);

    if (isBusy) {
        return null;
    }
    console.log(data);

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
                    <div className="container mar-b-30">
                        <div className="artist-page">
                            <div className="artist-hero has-cover">
                                <div
                                    className="artist-cover"
                                    style={{
                                        left: '-118px',
                                        right: '-118px',
                                        backgroundImage:
                                            'url(https://photo-zmp3.zmdcdn.me/cover_artist/2/1/5/4/21545e4d3c3460644c12d2cb15058a12.jpg)',
                                    }}
                                ></div>
                                <div className="container hero-body">
                                    <div className="left">
                                        <div className="information">
                                            <div className="top">
                                                <h3
                                                    className="artist-name title"
                                                    style={{ width: 'fitContent', fontSize: '60px' }}
                                                >
                                                    <span>
                                                        <span>
                                                            <span>{data.name}</span>
                                                        </span>
                                                        <span
                                                            style={{
                                                                position: 'fixed',
                                                                visibility: 'hidden',
                                                                top: '0px',
                                                                left: '0px',
                                                            }}
                                                        >
                                                            …
                                                        </span>
                                                    </span>
                                                </h3>
                                                <button
                                                    className="osx-btn play-btn pause is-outlined active is-medium button"
                                                    tabIndex="0"
                                                >
                                                    <i className="icon ic-play"></i>
                                                </button>
                                            </div>
                                            <div className="bottom">
                                                <span className="follow">
                                                    {FormatNumber(data.totalFollow)} người quan tâm
                                                </span>
                                                <button
                                                    className="osx-btn is-outlined active is-medium follow-btn is-upper button"
                                                    tabIndex="0"
                                                >
                                                    <i className="icon ic-addfriend"></i>
                                                    <span>Quan tâm</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="artist-home-content"></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Artist;
