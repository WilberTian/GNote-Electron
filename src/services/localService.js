import { Base64 } from 'js-base64';

import * as gnoteFsUtils from '../utils/fsUtils';

export default {
    getLocalNoteList: () => {
        return gnoteFsUtils.getLocalGNoteList();
    },

    getLocalNoteContent: (name) => {
        const encodedContent = gnoteFsUtils.getLocalGNoteContent(name);
        return Base64.decode(encodedContent);
    },

    createLocalNote: (name, commitMsg, content) => {
        gnoteFsUtils.createLocalGNote(name, JSON.stringify({
            name,
            commitMsg,
            content: Base64.encode(content)
        }));
    },

    updateLocalNote: (name, commitMsg, content) => {
        gnoteFsUtils.updateLocalGNote(name, JSON.stringify({
            name,
            commitMsg,
            content: Base64.encode(content)
        }));
    }
};
