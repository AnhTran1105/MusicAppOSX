import { Link } from 'react-router-dom';
import { AlbumIcon, ArtistIcon, RecentIcon, SongIcon } from '../../icons';
import { NavLink } from 'react-router-dom';
import axios from '../../utils/axios';
import { useEffect, useState } from 'react';

function Sidebar() {
    const [data, setData] = useState();
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        getAllPlaylists();
    }, []);

    const getAllPlaylists = async () => {
        await axios
            .get('/api/get-all-playlists')
            .then((response) => {
                setData(response.titles);
                setBusy(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (isBusy) {
        return null;
    }

    return (
        <aside className="osx-sidebar">
            <div className="sidebar-wrapper">
                <nav className="osx-navbar">
                    <div className="osx-navbar-brand">
                        <div className="osx-navbar-item">
                            <button className="osx-btn button">
                                <Link to="/">
                                    <div className="osx-logo"></div>
                                </Link>
                            </button>
                        </div>
                    </div>
                </nav>
                <nav className="osx-navbar osx-navbar-main">
                    <ul className="osx-navbar-menu hover">
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <NavLink
                                    className={(navData) =>
                                        navData.isActive
                                            ? 'is-active osx-navbar-link pad-tb-12'
                                            : 'osx-navbar-link pad-tb-12'
                                    }
                                    to="/mymusic"
                                >
                                    Library
                                </NavLink>
                            </div>
                        </li>
                        <li className="osx-navbar-item ">
                            <div className="osx-navbar-item-wrapper">
                                <NavLink
                                    className={(navData) =>
                                        navData.isActive
                                            ? 'is-active osx-navbar-link pad-tb-12'
                                            : 'osx-navbar-link pad-tb-12'
                                    }
                                    exact="true"
                                    to="/"
                                >
                                    Discovery
                                </NavLink>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <NavLink
                                    className={(navData) =>
                                        navData.isActive
                                            ? 'is-active osx-navbar-link pad-tb-12'
                                            : 'osx-navbar-link pad-tb-12'
                                    }
                                    to="/top100"
                                >
                                    Top 100
                                </NavLink>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <NavLink
                                    className={(navData) =>
                                        navData.isActive
                                            ? 'is-active osx-navbar-link pad-tb-12'
                                            : 'osx-navbar-link pad-tb-12'
                                    }
                                    to="/moi-phat-hanh"
                                >
                                    New Release
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-divide"></div>
                <nav className="osx-navbar osx-navbar-main">
                    <div className="osx-navbar-title">My Music</div>
                    <ul className="osx-navbar-menu">
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" to="/mymusic">
                                    <i className="icon">
                                        <SongIcon />
                                    </i>
                                    <span>Songs</span>
                                </Link>
                            </div>
                        </li>
                        <li className="osx-navbar-item ">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" to="/mymusic/history/song">
                                    <i className="icon">
                                        <RecentIcon />
                                    </i>
                                    <span>Recent</span>
                                </Link>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" to="/mymusic">
                                    <i className="icon">
                                        <AlbumIcon />
                                    </i>
                                    <span>Albums</span>
                                </Link>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" to="/mymusic">
                                    <i className="icon">
                                        <ArtistIcon />
                                    </i>
                                    <span>Artists</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
                <nav className="osx-navbar osx-navbar-main">
                    <div className="osx-navbar-title">
                        <span>Playlists</span>
                        {/* <ToolTip content="Tạo playlist mới">
                            <button className="osx-btn is-hover-circle">
                                <i className="icon">
                                    <AddIcon />
                                </i>
                            </button>
                        </ToolTip> */}
                    </div>
                    <ul className="osx-navbar-playlists">
                        {data.map((item) => (
                            <li key={item} className="playlist-item">
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
