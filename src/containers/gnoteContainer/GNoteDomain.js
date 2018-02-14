import { markdown } from 'markdown';

import githubService from '../../services/githubService';
import localService from '../../services/localService';

const domain = {

    model: {
        contentList: [],
        listLoading: false,

        activeNoteName: '',
        activeNoteContent: '',
        contentLoading: false,

        onlineStatus: navigator.onLine
    },

    action: {
        getNoteList: async () => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    listLoading: true
                };
            });

            let localNoteList = localService.getLocalNoteList();
            let githubNoteList = [];

            if (domain.getCurrentModel().onlineStatus) {
                githubNoteList = await githubService.getNoteList();

                githubNoteList.forEach((githubNoteItem) => {
                    const found = localNoteList.find((localNoteItem) => {
                        return localNoteItem.name === githubNoteItem.name;
                    });

                    if (!found) {
                        localService.createLocalNote(githubNoteItem);
                    } else {
                        //
                    }
                });
            }

            localNoteList = localService.getLocalNoteList();

            domain.dispatch((model) => {
                return {
                    ...model,
                    contentList: localNoteList,
                    listLoading: false
                };
            });
        },

        getNoteContent: async (name) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    contentLoading: true
                };
            });

            let content = 'Can not fetch content since it is offline';
            const loacalNoteData = localService.getLocalNoteData(name);
            if ('content' in loacalNoteData) {
                content = loacalNoteData.content;
            } else if ('path' in loacalNoteData) {
                if (domain.getCurrentModel().onlineStatus) {
                    const data = await githubService.getNoteContent(loacalNoteData.path);
                    localService.updateLocalNote(data, false);

                    content = localService.getLocalNoteData(name).content;
                }
            }

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

        updateOnlineStatus: (onlineStatus) => {
            domain.dispatch((model) => {
                return {
                    ...model,
                    onlineStatus
                };
            });
        }
    }
};

export default domain;
