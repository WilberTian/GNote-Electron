import React, { PureComponent } from 'react';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import GNoteDomain from './GNoteDomain';

import ListHeaderComponent from './components/ListHeaderComponent';
import GNoteListComponent from './components/GNoteListComponent';
import ContentHeaderComponent from './components/ContentHeaderComponent';
import GNoteContentComponent from './components/GNoteContentComponent';

import './gnote-container.less';

@DomainComponentCreator(GNoteDomain)
export default class GNoteComponent extends PureComponent {
    render() {
        return (
            <div className="gnote-container">
                <div className="gnote-list-component-wrapper">
                    <ListHeaderComponent />
                    <GNoteListComponent />
                </div>
                <div className="gnote-content-wrapper">
                    <ContentHeaderComponent />
                    <GNoteContentComponent />
                </div>
                <div className="blocker" />
            </div>
        );
    }
}
