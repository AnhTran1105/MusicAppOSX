import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import Playlist from '../../sections/Playlist';
import Banner from '../../sections/Banner';
import NewRelease from '../../sections/NewRelease';

const Home = () => {
    const [isBusy, setBusy] = useState(true);
    const [homeData, setHomeData] = useState(null);
    const [bannerData, setBannerData] = useState(null);
    const [typeLength, setTypeLength] = useState(null);
    const [songData, setSongData] = useState(null);
    const [songSrc, setSongSrc] = useState(null);
    const [playlistData, setPlaylistData] = useState(null);
    const [songIds, setSongIds] = useState(null);

    useEffect(() => {
        fetchHomeData();
    }, []);

    useEffect(() => {
        if (!isBusy && homeData != null) {
            const values = Object.values(homeData.items.filter((e) => e.sectionType === 'new-release')[0].items);
            setSongIds([...values[0], ...values[1], ...values[2]].map((item) => item.encodeId));
            setBannerData(homeData.items.filter((e) => e.sectionType === 'banner')[0].items);
            setTypeLength([values[0].length, values[1].length, values[2].length]);
            setPlaylistData(homeData.items.filter((e) => e.sectionType === 'playlist'));
        }
    }, [isBusy, homeData]);

    const fetchHomeData = async () => {
        try {
            const response = await axios.get('get-home/');
            setHomeData(response);
            setBusy(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getSong = async (songId) => {
        try {
            const response = await axios.get(`get-song/?id=${songId}`);
            return response;
            // Xử lý dữ liệu nhận được từ server ở đây
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    };

    const getInfoSong = async (songId) => {
        try {
            const response = await axios.get('get-info-song/', {
                params: {
                    id: songId,
                },
            });
            return response;
            // Xử lý dữ liệu nhận được từ server ở đây
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    };

    useEffect(() => {
        if (songIds) {
            (async () => {
                try {
                    const infoPromises = songIds.map((id) => getInfoSong(id));
                    const srcPromises = songIds.map((id) => getSong(id));

                    const infoList = await Promise.all(infoPromises);
                    const srcList = await Promise.all(srcPromises);

                    setSongData(infoList);
                    setSongSrc(srcList);
                } catch (error) {
                    console.error('Error fetching song info and song source:', error);
                }
            })();
        }
    }, [songIds]);

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
                        <Banner props={isBusy ? undefined : bannerData} />
                        <Playlist
                            props={isBusy || !playlistData?.[0]?.items ? null : playlistData[0].items}
                            sectionLink={isBusy || !playlistData?.[0]?.link ? null : playlistData[0].link}
                            sectionTitle={isBusy || !playlistData?.[0]?.title ? null : playlistData[0].title}
                            cardTitle={isBusy || !playlistData?.[0]?.itemType ? true : false}
                        />
                        <NewRelease
                            songData={isBusy ? undefined : songData}
                            songSrc={isBusy ? undefined : songSrc}
                            typeLength={typeLength}
                        />
                        <Playlist
                            props={isBusy || !playlistData?.[1]?.items ? null : playlistData[1].items}
                            sectionLink={isBusy || !playlistData?.[1]?.link ? null : playlistData[1].link}
                            sectionTitle={isBusy || !playlistData?.[1]?.title ? null : playlistData[1].title}
                            cardTitle={isBusy || !playlistData?.[1]?.itemType ? true : false}
                        />
                        <Playlist
                            props={isBusy || !playlistData?.[2]?.items ? null : playlistData[2].items}
                            sectionLink={isBusy || !playlistData?.[2]?.link ? null : playlistData[2].link}
                            sectionTitle={isBusy || !playlistData?.[2]?.title ? null : playlistData[2].title}
                            cardTitle={isBusy || !playlistData?.[2]?.itemType ? true : false}
                        />
                        {/* <NewReleaseChart props={isBusy ? undefined : newReleaseChartData} sectionTitle="BXH Nhạc Mới" />
                        <WeekChart props={isBusy ? undefined : weekChartData} /> */}
                        <Playlist
                            props={isBusy || !playlistData?.[3]?.items ? null : playlistData[3].items}
                            sectionLink={isBusy || !playlistData?.[3]?.link ? null : playlistData[3].link}
                            sectionTitle={isBusy || !playlistData?.[3]?.title ? null : playlistData[3].title}
                            cardTitle={isBusy || !playlistData?.[3]?.itemType ? true : false}
                        />
                        <Playlist
                            props={isBusy || !playlistData?.[4]?.items ? null : playlistData[4].items}
                            sectionLink={isBusy || !playlistData?.[4]?.link ? null : playlistData[4].link}
                            sectionTitle={isBusy || !playlistData?.[4]?.title ? null : playlistData[4].title}
                            cardTitle={isBusy || !playlistData?.[4]?.itemType ? true : false}
                        />

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
