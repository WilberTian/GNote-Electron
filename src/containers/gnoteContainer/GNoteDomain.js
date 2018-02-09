import { Base64 } from 'js-base64';
import { markdown } from 'markdown';

// import services from '../../services/contentService';
import localService from '../../services/localService';

const domain = {

    model: {
        contentList: [],
        listLoading: false,

        activeNoteName: '',
        activeNoteContent: '',
        contentLoading: false
    },

    action: {
        getNoteList: async () => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    listLoading: true
                };
            });

            const result = localService.getLocalNoteList();

            domain.dispatch((model) => {
                return {
                    ...model,
                    contentList: result,
                    listLoading: false
                };
            });
        },

        getNoteContent: (name) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    contentLoading: true
                };
            });

            const content = localService.getLocalNoteContent(name);

            domain.dispatch((model) => {
                return {
                    ...model,
                    activeNoteName: name,
                    activeNoteContent: markdown.toHTML(Base64.decode(content)),
                    contentLoading: false
                };
            });
        },

        updateNote: async () => {
            //
        },

        deleteNote: async () => {
            //
        },
    }
};

export default domain;
