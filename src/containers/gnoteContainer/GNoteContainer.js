import React, { PureComponent } from 'react';
import { Layout, Icon, Button, Spin } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import GNoteDomain from './GNoteDomain';

import GNoteListComponent from './components/GNoteListComponent';

import './gnote-container.less';

const { Header, Sider, Content } = Layout;

const mapper = {
    modelMapper: (model) => {
        return {
            activeNoteContent: model.activeNoteContent,
            contentLoading: model.contentLoading
        };
    },
    actionMapper: (action) => {
        return {
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

    _toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    _createGNote() {
        location.hash = 'create';
    }

    _convertToHTML(rawHTML) {
        function createMarkup() {
            return { __html: rawHTML };
        }
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={createMarkup()} />
        );
    }

    render() {
        const { activeNoteContent, contentLoading } = this.props;

        return (
            <Layout className="gnote-container">
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <GNoteListComponent />
                </Sider>
                <Layout>
                    <Header>
                        <Icon
                          className="trigger"
                          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={::this._toggle}
                        />
                        <Button
                          type="primary"
                          icon="plus"
                          onClick={::this._createGNote}
                        >
                            Create
                        </Button>
                    </Header>
                    <Content>
                        <Spin spinning={contentLoading}>
                            {::this._convertToHTML(activeNoteContent)}
                        </Spin>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
