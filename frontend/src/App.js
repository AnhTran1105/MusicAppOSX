import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import './App.css';
import Player from './components/Player';
import AlbumDetail from './pages/AlbumDetail';
import ArtistDetail from './pages/ArtistDetail';
import ArtistSong from './pages/ArtistSong';
import Search from './pages/Search';
import Library from './pages/Library';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useStore } from './store';
import Top100 from './pages/Top100';
import NewReleaseChart from './pages/NewReleaseChart';

function App() {
    const [state, dispatch] = useStore();
    return (
        <Router>
            <div className="App">
                <Routes>
                    {!state.loggedIn ? <Route path="/" element={<Navigate to="/login" />} /> : ''}
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
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
                    <Route
                        path="/:alias/bai-hat"
                        element={
                            <DefaultLayout>
                                <ArtistSong />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/nghe-si/:alias/bai-hat"
                        element={
                            <DefaultLayout>
                                <ArtistSong />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/tim-kiem/tat-ca"
                        element={
                            <DefaultLayout>
                                <Search />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/tim-kiem/playlist"
                        element={
                            <DefaultLayout>
                                <Search />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/tim-kiem/artist"
                        element={
                            <DefaultLayout>
                                <Search />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/mymusic"
                        element={
                            <DefaultLayout>
                                <Library />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/top100"
                        element={
                            <DefaultLayout>
                                <Top100 />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path="/moi-phat-hanh"
                        element={
                            <DefaultLayout>
                                <NewReleaseChart />
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
