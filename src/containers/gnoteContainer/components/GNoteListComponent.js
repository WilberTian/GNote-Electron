import React, { PureComponent } from 'react';
import { Spin } from 'antd';

import GNoteItemComponent from './GNoteItemComponent';

import './gnote-list-component.less';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: (model) => {
        return {
            contentList: model.contentList,
            listLoading: model.listLoading
        };
    },
    actionMapper: (action) => {
        return {
            getNoteList: action.getNoteList
        };
    }
};

@DomainMapper(mapper)
export default class GNoteListComponent extends PureComponent {
    async componentWillMount() {
        const { getNoteList } = this.props;
        await getNoteList();
    }

    render() {
        const { contentList, listLoading } = this.props;

        return (
            <div className="gnote-list-component">
                <Spin spinning={listLoading}>
                    {contentList.length > 0 && contentList.map((contentItem) => {
                        return (
                            <GNoteItemComponent key={contentItem.path} contentItem={contentItem} />
                        );
                    })}
                </Spin>
            </div>
        );
    }
}
