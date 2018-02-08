import React, { PureComponent } from 'react';

import './gnote-item-component.less';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: () => {},
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
        await getNoteContent(contentItem.path);
    }

    render() {
        const { contentItem } = this.props;
        /* eslint-disable */
        return (
            <div className="gnote-item-component" onClick={::this._onGNoteItemSelect}>
                {contentItem.name}
            </div>
        );
        /* eslint-enable */
    }
}
