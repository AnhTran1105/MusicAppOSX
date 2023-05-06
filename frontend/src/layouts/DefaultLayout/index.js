import NowPlayingBar from '../../components/NowPlayingBar';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function DefaultLayout({ children }) {
    return (
        <div className="osx-layout has-player">
            <Header />
            <Sidebar />
            {children}
            <NowPlayingBar />
        </div>
    );
}

export default DefaultLayout;
