import gnotePage from '../pages/gnote';

gnotePage();

if (module.hot) {
    module.hot.accept('../pages/gnote', () => {
        const _new = require('../pages/gnote').default;
        _new();
    });
}
