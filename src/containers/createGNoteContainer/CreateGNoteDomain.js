import localService from '../../services/localService';

const domain = {

    model: {
        commitMsg: '',
        content: ''
    },

    action: {
        createNote: (name, commitMsg, content) => {
            localService.createLocalNote(name, commitMsg, content);
        }
    }
};

export default domain;
