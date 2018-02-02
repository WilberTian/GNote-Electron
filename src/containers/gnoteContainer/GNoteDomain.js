import { Base64 } from 'js-base64';
import { markdown } from 'markdown';

import services from '../../services/contentService';

const domain = {

    model: {
        contentList: [],
        listLoading: false,

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

            const result = await services.getNoteList();

            domain.dispatch((model) => {
                return {
                    ...model,
                    contentList: result,
                    listLoading: false
                };
            });
        },

        getNoteContent: async (path) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    contentLoading: true
                };
            });

            const result = await services.getNoteContent(path);

            domain.dispatch((model) => {
                return {
                    ...model,
                    activeNoteContent: markdown.toHTML(Base64.decode(result.content)),
                    contentLoading: false
                };
            });
        },

        createNote: async () => {
            //
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
