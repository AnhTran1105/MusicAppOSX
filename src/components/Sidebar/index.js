function Sidebar() {
    return (
        <aside className="osx-sidebar">
            <div className="sidebar-wrapper">
                <nav className="osx-navbar">
                    <div className="osx-navbar-brand">
                        <div className="osx-navbar-item">
                            <button className="osx-btn button">
                                <div className="osx-logo"></div>
                            </button>
                        </div>
                    </div>
                </nav>
                <nav className="osx-navbar osx-navbar-main">
                    <ul className="osx-navbar-menu">
                        <li className="osx-navbar-item">
                            <a href="/">Library</a>
                        </li>
                        <li className="osx-navbar-item">
                            <a href="/">Browse</a>
                        </li>
                        <li className="osx-navbar-item">
                            <a href="/">Radio</a>
                        </li>
                        <li className="osx-navbar-item">
                            <a href="/">Store</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
