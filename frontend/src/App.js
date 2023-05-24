import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import './App.css';
import Player from './components/Player';
import AlbumDetail from './pages/AlbumDetail';
import ArtistDetail from './pages/ArtistDetail';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route
                        path="/album/:albumName/:albumId.html"
                        element={
                            <DefaultLayout>
                                <AlbumDetail />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/:alias"
                        element={
                            <DefaultLayout>
                                <ArtistDetail />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/nghe-si/:alias"
                        element={
                            <DefaultLayout>
                                <ArtistDetail />
                            </DefaultLayout>
                        }
                    />
                </Routes>
                <Player />
                <Player />
                <ul id="osx-notify-list"></ul>
                <div id="osx_Popup"></div>
            </div>
        </Router>
    );
}

export default App;
