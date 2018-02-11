import App from '../containers/common/App';
import GNoteContainer from '../containers/gnoteContainer/GNoteContainer';
import EditGNoteContainer from '../containers/createGNoteContainer/EditGNoteContainer';

import NotFound from './NotFound';

const editGNoteRoute = {
    path: '/edit',
    component: EditGNoteContainer
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
        editGNoteRoute,
        notFountRoute
    ]
};

export default route;
