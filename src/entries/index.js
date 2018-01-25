import detailPage from '../pages/index';

detailPage();

if (module.hot) {
    module.hot.accept('../pages/index', () => {
        const _new = require('../pages/index').default;
        _new();
    });
}
