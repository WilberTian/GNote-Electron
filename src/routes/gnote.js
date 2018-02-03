import App from '../containers/common/App';
import GNoteContainer from '../containers/gnoteContainer/GNoteContainer';
import CreateGNoteContainer from '../containers/createGNoteContainer/CreateGNoteContainer';

import NotFound from './NotFound';

const createGNoteRoute = {
    path: '/create',
    component: CreateGNoteContainer
};

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
        createGNoteRoute,
        notFountRoute
    ]
};

export default route;
