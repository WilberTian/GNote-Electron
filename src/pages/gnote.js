import React from 'react';
import { render } from 'react-dom';

import 'github-markdown-css/github-markdown.css';

import routes from '../routes/gnote';
import Root from '../containers/common/Root';

export default () => {
    render(
        <Root routes={routes} />,
        document.getElementById('root')
    );
};
