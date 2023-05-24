function ArtistSong() {
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
                        <div className="artist-song">
                            <div class="container artist-tab-title mar-b-5">
                                <div class="is-center">
                                    <h3 class="mar-b-0 mar-r-10 title">
                                        <span>Sơn Tùng M-TP</span> - Tất cả bài hát
                                    </h3>
                                    <button
                                        class="zm-btn play-btn is-outlined active is-upper is-small button"
                                        tabindex="0"
                                    >
                                        <i class="icon ic-play"></i>
                                    </button>
                                </div>
                                <div class="zm-dropdown">
                                    <div class="zm-dropdown-trigger">
                                        <i class="icon mar-r-10 ic-sort"></i>
                                        <button class="zm-btn dropdown-button button" tabindex="0">
                                            <span class="dropdown-name">Nổi bật</span>
                                            <i class="icon ic-go-down"></i>
                                        </button>
                                    </div>
                                    <div class="zm-dropdown-content">
                                        <div class="zm-dropdown-list-item">Nổi bật</div>
                                        <div class="zm-dropdown-list-item">Mới nhất</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ArtistSong;
