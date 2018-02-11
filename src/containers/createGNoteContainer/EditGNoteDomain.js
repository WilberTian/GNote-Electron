import { Base64 } from 'js-base64';

import localService from '../../services/localService';

const domain = {

    model: {},

    action: {
        saveNote: (name, commitMsg, content) => {
            localService.createLocalNote(name, commitMsg, Base64.encode(content));
        },

        getNoteContent: (name) => {
            return localService.getLocalNoteContent(name);
        }
    }
};

export default domain;
