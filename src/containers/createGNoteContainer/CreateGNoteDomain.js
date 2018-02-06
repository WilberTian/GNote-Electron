import services from '../../services/contentService';

const domain = {

    model: {
        commitMsg: '',
        content: ''
    },

    action: {
        createNote: async (commitMsg, content) => {
            const result = await services.createNote(commitMsg, content);
            return result;
        }
    }
};

export default domain;
