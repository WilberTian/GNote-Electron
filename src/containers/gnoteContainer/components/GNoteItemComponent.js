import React, { PureComponent } from 'react';
import { Button, message } from 'antd';

import * as gnoteStatus from '../../../configs/gnoteStatus';

import './gnote-item-component.less';

import DomainMapper from '../../../utils/DomainMapper';

const ButtonGroup = Button.Group;

const mapper = {
    modelMapper: (model) => {
        return {
            activeNoteName: model.activeNoteName
        };
    },
    actionMapper: (action) => {
        return {
            getNoteContent: action.getNoteContent
        };
    }
};

@DomainMapper(mapper)
export default class GNoteItemComponent extends PureComponent {
    async _onGNoteItemSelect() {
        const { getNoteContent, contentItem } = this.props;
        try {
            await getNoteContent(contentItem.name);
        } catch (e) {
            message.error(e.message, 5);
        }
    }

    _editGNoteItem(name) {
        location.hash = `/edit?name=${name}`;
    }

    render() {
        const { contentItem, activeNoteName } = this.props;
        /* eslint-disable */
        return (
            <div
              className={`gnote-item-component ${activeNoteName === contentItem.name ? 'active' : ''}`}
            >
                {contentItem.status === gnoteStatus.NOT_SYNCED && <div className="not-synced-item">
                    <span className="item-name">
                        {contentItem.name}
                    </span>
                    <span className="item-status">
                        {contentItem.status}
                    </span>
                    <ButtonGroup className="item-btn-group">
                        <Button icon="cloud-download" />
                    </ButtonGroup>
                </div>}

                {contentItem.status === gnoteStatus.SYNCED && <div className="synced-item">
                    <span className="item-name" onClick={::this._onGNoteItemSelect}>
                        {contentItem.name}
                    </span>
                    <span className="item-status">
                        {contentItem.status}
                    </span>
                    <ButtonGroup className="item-btn-group">
                        <Button icon="edit" onClick={() => { this._editGNoteItem(contentItem.name); }} />
                    </ButtonGroup>
                </div>}

                {contentItem.status === gnoteStatus.DRAFT && <div className="draft-item">
                    <span className="item-name" onClick={::this._onGNoteItemSelect}>
                        {contentItem.name}
                    </span>
                    <span className="item-status">
                        {contentItem.status}
                    </span>
                    <ButtonGroup className="item-btn-group">
                        <Button icon="edit" onClick={() => { this._editGNoteItem(contentItem.name); }} />
                        <Button icon="cloud-upload" />
                        <Button icon="cloud-download" />
                    </ButtonGroup>
                </div>}
            </div>
        );
        /* eslint-enable */
    }
}
