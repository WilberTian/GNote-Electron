import gnoteUtils from '../../fsUtils';

export default {
    getLocalNoteList: () => {
        return gnoteUtils.getLocalGNoteList();
    },

    getLocalNoteContent: (name) => {
        return gnoteUtils.getLocalGNoteContent(name);
    },

    createLocalNote: (name, commitMsg, content) => {
        gnoteUtils.createLocalGNote(name, JSON.stringify({
            name,
            commitMsg,
            content
        }));
    },

    updateLocalNote: (name, commitMsg, content) => {
        gnoteUtils.updateLocalGNote(name, JSON.stringify({
            name,
            commitMsg,
            content
        }));
    }
};
