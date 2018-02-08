import React, { PureComponent } from 'react';
import { Button } from 'antd';
import isElectron from 'is-electron';

import './content-header-component.less';

export default class ContentHeaderComponent extends PureComponent {
    state = {
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

    _createGNote() {
        location.hash = 'create';
    }

    render() {
        return (
            <div className="content-header-component">
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
            </div>
        );
    }
}
