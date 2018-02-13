import localService from '../../services/localService';

const domain = {

    model: {},

    action: {
        saveNote: (isCreate, name, commitMsg, content) => {
            if (isCreate) {
                localService.createLocalNote(name, commitMsg, content);
            } else {
                localService.updateLocalNote(name, commitMsg, content);
            }
        },

        getNoteContent: (name) => {
            return localService.getLocalNoteContent(name);
        }
    }
};

export default domain;
