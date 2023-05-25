import { AddIcon, AlbumIcon, ArtistIcon, PlaylistIcon, RecentIcon, SongIcon, StarIcon, UploadIcon } from '../../icons';
import ToolTip from '@tippyjs/react';
function Sidebar() {
    return (
        <aside className="osx-sidebar">
            <div className="sidebar-wrapper">
                <nav className="osx-navbar">
                    <div className="osx-navbar-brand">
                        <div className="osx-navbar-item">
                            <button className="osx-btn button">
                                <a href="/">
                                    <div className="osx-logo"></div>
                                </a>
                            </button>
                        </div>
                    </div>
                </nav>
                <nav className="osx-navbar osx-navbar-main">
                    <ul className="osx-navbar-menu">
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-link" href="/">
                                    Library
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item ">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-link is-active" href="/">
                                    Discovery
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-link" href="/">
                                    Radio
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-link" href="/">
                                    Store
                                </a>
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
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <SongIcon />
                                    </i>
                                    <span>Songs</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item ">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <RecentIcon />
                                    </i>
                                    <span>Recent</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <UploadIcon />
                                    </i>
                                    <span>Local</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <AlbumIcon />
                                    </i>
                                    <span>Albums</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <ArtistIcon />
                                    </i>
                                    <span>Artists</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <nav className="osx-navbar osx-navbar-main">
                    <div className="osx-navbar-title">
                        <span>Playlists</span>
                        <ToolTip content="Tạo playlist mới">
                            <button className="osx-btn is-hover-circle">
                                <i className="icon">
                                    <AddIcon />
                                </i>
                            </button>
                        </ToolTip>
                    </div>
                    <ul className="osx-navbar-menu">
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <StarIcon />
                                    </i>
                                    <span>Starred</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item ">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <PlaylistIcon />
                                    </i>
                                    <span>Discover</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <PlaylistIcon />
                                    </i>
                                    <span>Favourites</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <PlaylistIcon />
                                    </i>
                                    <span>Top Charts</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <PlaylistIcon />
                                    </i>
                                    <span>Station</span>
                                </a>
                            </div>
                        </li>
                        <li className="osx-navbar-item">
                            <div className="osx-navbar-item-wrapper">
                                <a className="osx-navbar-type" href="/">
                                    <i className="icon">
                                        <PlaylistIcon />
                                    </i>
                                    <span>Genres</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                    <ul className="osx-navbar-playlists">
                        <li className="playlist-item">Playlist 1</li>
                        <li className="playlist-item">Playlist 2</li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
