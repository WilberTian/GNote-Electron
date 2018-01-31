import App from '../containers/common/App';
import GNoteContainer from '../containers/gnoteContainer/GNoteContainer';

import NotFound from './NotFound';

const notFountRoute = {
    path: '*',
    component: NotFound,
};

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: GNoteContainer,
    },
    childRoutes: [
        notFountRoute
    ]
};

export default route;
