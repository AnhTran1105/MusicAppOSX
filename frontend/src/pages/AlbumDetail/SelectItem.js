import SongItem from '../../components/SongItem/SongItem';
import usePortal from 'react-cool-portal';

function SelectItem({ props, loadSongList }) {
    const { Portal, show } = usePortal({
        defaultShow: false,
    });
    return (
        <div className="select-item">
            <div className="checkbox-wrapper">
                <label className="checkbox">
                    <input type="checkbox" />
                </label>
            </div>
            <div className="list-item bor-b-1 media-item hide-right">
                <SongItem loadSongList={loadSongList} isSongPrefix={true} props={props} isContent={true} />
            </div>
        </div>
    );
}

export default SelectItem;
