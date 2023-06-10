import SongItem from '../../components/SongItem/SongItem';

function SelectItem({ props, loadSongList, songId, recentPlay = false }) {
    if (!recentPlay) {
        return (
            <div className="select-item">
                <div className="checkbox-wrapper">
                    <label className="checkbox">
                        <input type="checkbox" />
                    </label>
                </div>
                <div className="list-item bor-b-1 media-item hide-right">
                    <SongItem
                        loadSongList={loadSongList}
                        isSongPrefix={true}
                        props={props}
                        isContent={true}
                        songId={songId}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="list-item bor-b-1 media-item hide-right">
                <SongItem
                    loadSongList={loadSongList}
                    isSongPrefix={true}
                    props={props}
                    isContent={true}
                    songId={songId}
                />
            </div>
        );
    }
}

export default SelectItem;
