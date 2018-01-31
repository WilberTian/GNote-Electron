import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import GNoteDomain from './GNoteDomain';

import './gnote-container.less';

const { Header, Sider, Content } = Layout;

const mapper = {
    modelMapper: (model) => {
        return {
            contentList: model.contentList,
            activeNoteContent: model.activeNoteContent
        };
    },
    actionMapper: (action) => {
        return {
            getNoteList: action.getNoteList,
            getNoteContent: action.getNoteContent
        };
    }
};

@DomainComponentCreator(GNoteDomain)
@DomainMapper(mapper)
export default class GNoteComponent extends PureComponent {
    state = {
        collapsed: false
    };

    async componentWillMount() {
        const { getNoteList } = this.props;
        await getNoteList();
    }

    _toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    async _onMenuItemSelect(item) {
        const { getNoteContent } = this.props;
        const noteContent = await getNoteContent(item.key);
    }

    render() {
        const { contentList, activeNoteContent } = this.props;

        return (
            <Layout className="gnote-container">
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu
                      theme="dark"
                      mode="inline"
                      onSelect={::this._onMenuItemSelect}
                    >
                        {contentList.length > 0 && contentList.map((contentItem, idx) => {
                            return (
                                <Menu.Item key={contentItem.path}>
                                    <Icon type="user" />
                                    <span>{contentItem.name}</span>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Header>
                        <Icon
                          className="trigger"
                          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={this._toggle}
                        />
                    </Header>
                    <Content>
                        {activeNoteContent}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
