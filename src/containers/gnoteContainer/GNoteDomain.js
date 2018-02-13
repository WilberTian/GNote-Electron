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

            const content = localService.getLocalNoteData(name).content;

            domain.dispatch((model) => {
                return {
                    ...model,
                    activeNoteName: name,
                    activeNoteContent: markdown.toHTML(content),
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
