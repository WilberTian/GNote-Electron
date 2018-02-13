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

        getNoteData: (name) => {
            return localService.getLocalNoteData(name);
        }
    }
};

export default domain;
