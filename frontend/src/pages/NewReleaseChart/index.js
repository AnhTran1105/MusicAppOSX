import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useStore, actions } from '../../store';
import SongItem from '../../components/SongItem/SongItem';

function NewReleaseChart() {
    const [data, setData] = useState(null);
    const [isBusy, setBusy] = useState(true);

    const [state, dispatch] = useStore();

    useEffect(() => {
        (async () => {
            try {
                setData(await getNewReleaseChart());
                setBusy(false);
            } catch (error) {
                console.error('Error fetching song info and song source:', error);
            }
        })();
    }, []);

    const getNewReleaseChart = async () => {
        try {
            const response = await axios.get('get-new-release-chart');
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const loadSongList = () => {
        dispatch(actions.setSongList(data.items.map((item) => item.encodeId)));
    };

    if (isBusy) {
        return null;
    }

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
                    <div className="container top-new-relesase-container">
                        <div className="container new-release-chart-container">
                            <div className="new-release-chart-header">
                                <div className="title">
                                    <h3 className="mar-0 title">{data.title}</h3>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon">
                                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                                                <g filter="url(#filter0_d_3141_46346)">
                                                    <circle cx="22" cy="21" r="18" fill="#FEFFFF"></circle>
                                                </g>
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z"
                                                    fill="#141414"
                                                ></path>
                                                <defs>
                                                    <filter
                                                        id="filter0_d_3141_46346"
                                                        x="0"
                                                        y="0"
                                                        width="44"
                                                        height="44"
                                                        filterUnits="userSpaceOnUse"
                                                        colorInterpolationFilters="sRGB"
                                                    >
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                        <feColorMatrix
                                                            in="SourceAlpha"
                                                            type="matrix"
                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                            result="hardAlpha"
                                                        ></feColorMatrix>
                                                        <feOffset dy="1"></feOffset>
                                                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                                        <feColorMatrix
                                                            type="matrix"
                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                                                        ></feColorMatrix>
                                                        <feBlend
                                                            mode="normal"
                                                            in2="BackgroundImageFix"
                                                            result="effect1_dropShadow_3141_46346"
                                                        ></feBlend>
                                                        <feBlend
                                                            mode="normal"
                                                            in="SourceGraphic"
                                                            in2="effect1_dropShadow_3141_46346"
                                                            result="shape"
                                                        ></feBlend>
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </i>
                                    </button>
                                </div>
                            </div>
                            <div className="list mar-b-20">
                                {data.items.map((item, index) => (
                                    <div key={index} className="chart-song-item">
                                        <div className="list-item bor-b-1 media-item hide-right">
                                            <SongItem
                                                loadSongList={loadSongList}
                                                props={item}
                                                isContent={true}
                                                ranking={index + 1}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default NewReleaseChart;
