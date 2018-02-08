import React, { PureComponent } from 'react';
import { Spin } from 'antd';

import './gnote-content-component.less';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: (model) => {
        return {
            contentLoading: model.contentLoading,
            activeNoteContent: model.activeNoteContent
        };
    },
    actionMapper: () => {}
};

@DomainMapper(mapper)
export default class GNoteContentComponent extends PureComponent {
    _convertToHTML(rawHTML) {
        function createMarkup() {
            return { __html: rawHTML };
        }
        /* eslint-disable */
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={createMarkup()} />
        );
        /* eslint-enable */
    }

    render() {
        const { activeNoteContent, contentLoading } = this.props;

        return (
            <div className="gnote-content-component">
                <Spin spinning={contentLoading}>
                    {::this._convertToHTML(activeNoteContent)}
                </Spin>
            </div>
        );
    }
}
