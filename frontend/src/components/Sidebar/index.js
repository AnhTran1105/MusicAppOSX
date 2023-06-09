import { Link } from 'react-router-dom';
import { AddIcon, AlbumIcon, ArtistIcon, PlaylistIcon, RecentIcon, SongIcon, UploadIcon } from '../../icons';
import ToolTip from '@tippyjs/react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
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
                                        navData.isActive ? 'is-active osx-navbar-link' : 'osx-navbar-link'
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
                                        navData.isActive ? 'is-active osx-navbar-link' : 'osx-navbar-link'
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
                                        navData.isActive ? 'is-active osx-navbar-link' : 'osx-navbar-link'
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
                                        navData.isActive ? 'is-active osx-navbar-link' : 'osx-navbar-link'
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
                                <Link className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <SongIcon />
                                    </i>
                                    <span>Songs</span>
                                </Link>
                            </div>
                        </li>
                        <li className="osx-navbar-item ">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <RecentIcon />
                                    </i>
                                    <span>Recent</span>
                                </Link>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <UploadIcon />
                                    </i>
                                    <span>Local</span>
                                </Link>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <AlbumIcon />
                                    </i>
                                    <span>Albums</span>
                                </Link>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" href="/">
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
                    <ul className="osx-navbar-menu">
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <Link className="osx-navbar-type" href="/mymusic">
                                    <i className="icon">
                                        <PlaylistIcon />
                                    </i>
                                    <span>Favourites</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <ul className="osx-navbar-playlists">
                        <li className="playlist-item">Untitled</li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
