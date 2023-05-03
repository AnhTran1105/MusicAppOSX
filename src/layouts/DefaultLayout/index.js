import NowPlayingBar from '../../components/NowPlayingBar';
import Sidebar from '../../components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="osx-layout">
            <Sidebar />
            {children}
            <NowPlayingBar />
        </div>
    );
}

export default DefaultLayout;
