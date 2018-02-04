import React, { PureComponent } from 'react';
import { Spin, Menu, Icon } from 'antd';

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
            getNoteList: action.getNoteList,
            getNoteContent: action.getNoteContent
        };
    }
};

@DomainMapper(mapper)
export default class GNoteListComponent extends PureComponent {
    async componentWillMount() {
        const { getNoteList } = this.props;
        await getNoteList();
    }

    async _onMenuItemSelect(item) {
        const { getNoteContent } = this.props;
        await getNoteContent(item.key);
    }

    render() {
        const { contentList, listLoading } = this.props;

        return (
            <Spin spinning={listLoading}>
                <Menu
                  theme="dark"
                  mode="inline"
                  onSelect={::this._onMenuItemSelect}
                >
                    {contentList.length > 0 && contentList.map((contentItem) => {
                        return (
                            <Menu.Item key={contentItem.path}>
                                <Icon type="user" />
                                <span>{contentItem.name}</span>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Spin>
        );
    }
}
