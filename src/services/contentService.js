import fetch from '../utils/fetch';

const prefix = '/api';
// 'https://api.github.com/repos/WilberTian/GNote-Contents';

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
            url: `${prefix}/${path}`
        };

        const data = await fetch(fetchConfig);
        return data;
    },

    createNote: async (msg, content) => {
        const fetchConfig = {
            url: `${prefix}/contents`,
            data: {
                message: msg,
                content
            }
        };

        const data = await fetch(fetchConfig);
        return data;
    }
};