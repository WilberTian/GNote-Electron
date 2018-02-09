import fetch from '../utils/fetch';

import * as configs from '../../scripts/config';

// const prefix = 'https://api.github.com/repos/WilberTian/GNote-Contents';
const prefix = `http://${configs.developmentIP}:${configs.developmentPort}/api`;

export default {
    getNoteList: async () => {
        const fetchConfig = {
            url: `${prefix}/contents`
        };

        const data = await fetch(fetchConfig);
        return data;
    },

    getNoteContent: async (path) => {
        const fetchConfig = {
            url: `${prefix}/contents/${path}`
        };

        const data = await fetch(fetchConfig);
        return data;
    },

    createNote: async (commitMsg, content) => {
        const fetchConfig = {
            url: `${prefix}/contents`,
            data: {
                message: commitMsg,
                content
            }
        };

        const data = await fetch(fetchConfig);
        return data;
    }
};
