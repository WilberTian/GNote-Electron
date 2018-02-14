import { Base64 } from 'js-base64';

import * as gnoteFsUtils from '../utils/fsUtils';

export default {
    getLocalNoteList: () => {
        return gnoteFsUtils.getLocalGNoteList();
    },

    getLocalNoteData: (name) => {
        const noteData = gnoteFsUtils.getLocalGNoteData(name);

        if ('content' in noteData) {
            noteData.content = Base64.decode(noteData.content);
        }

        return noteData;
    },

    createLocalNote: (noteData) => {
        if ('content' in noteData) {
            noteData.content = Base64.encode(noteData.content);
        }

        gnoteFsUtils.createLocalGNote(noteData.name, JSON.stringify(noteData));
    },

    updateLocalNote: (noteData, needEncode = true) => {
        console.log(noteData);
        if ('content' in noteData && needEncode) {
            noteData.content = Base64.encode(noteData.content);
        }

        gnoteFsUtils.updateLocalGNote(noteData.name, JSON.stringify(noteData));
    }
};
