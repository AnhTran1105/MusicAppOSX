import SongItem from '../../components/SongItem/SongItem';

function SelectItem() {
    return (
        <div className="select-item">
            <div className="checkbox-wrapper">
                <label className="checkbox">
                    <input type="checkbox" />
                </label>
            </div>
            <div className="list-item bor-b-1 media-item hide-right">
                <SongItem />
            </div>
        </div>
    );
}

export default SelectItem;
