import SearchBar from '../SearchBar';

function Header() {
    return (
        <header className="osx-header is-sticky">
            <div className="level">
                <div className="level-left">
                    <button className="osx-btn disabled button" tabIndex="0">
                        <i className="icon ic-back"></i>
                    </button>
                    <button className="osx-btn disabled button" tabIndex="0">
                        <i className="icon ic-forward"></i>
                    </button>
                    <SearchBar />
                </div>
                <div className="level-right">
                    <div className="setting-item">
                        <button className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                            <i className="icon ic-settings"></i>
                        </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div className="osx-avatar-frame">
                            <button className="osx-btn button" tabIndex="0">
                                <figure className="image is-38x38 is-rounded">
                                    <img src={require('../../images/user.png')} alt="" />
                                </figure>
                                <i className="icon z-ic-svg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
