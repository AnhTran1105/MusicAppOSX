import Following from '../pages/Following';
import Home from '../pages/Home';
import Me from '../pages/Me';
import config from '../config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.me, component: Me },
    { path: config.routes.following, component: Following },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
