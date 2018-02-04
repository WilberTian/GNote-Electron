import React, { PureComponent } from 'react';
import isElectron from 'is-electron';
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
        collapsed: false,
        onlineStatus: false
    };

    componentWillMount() {
        if (isElectron()) {
            window.addEventListener('online', this._updateOnlineStatus);
            window.addEventListener('offline', this._updateOnlineStatus);

            this._updateOnlineStatus();
        }
    }

    componentWillUmount() {
        if (isElectron()) {
            window.removeEventListener('online', this._updateOnlineStatus);
            window.removeEventListener('offline', this._updateOnlineStatus);
        }
    }

    _updateOnlineStatus() {
        const { ipcRenderer } = window.require('electron');

        const onlineStatus = navigator.onLine ? 'online' : 'offline';
        ipcRenderer.send('online-status-change-event', onlineStatus);

        this.setState({
            onlineStatus
        });
    }

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
        /* eslint-disable */
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={createMarkup()} />
        );
        /* eslint-enable */
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
                          size="small"
                          shape="circle"
                          icon="plus"
                          onClick={::this._createGNote}
                        />
                        {this.state.onlineStatus ?
                            <span className="online-status online">Online</span> :
                            <span className="online-status offline">Offline</span>
                        }
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
