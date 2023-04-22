import Sidebar from '../../components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="osx-layout">
            <Sidebar />
            {children}
        </div>
    );
}

export default DefaultLayout;
