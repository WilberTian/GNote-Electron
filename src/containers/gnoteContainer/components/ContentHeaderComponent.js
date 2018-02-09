import React, { PureComponent } from 'react';

import './content-header-component.less';

export default class ContentHeaderComponent extends PureComponent {
    state = {
        onlineStatus: false
    };

    componentWillMount() {
        window.addEventListener('online', this._updateOnlineStatus);
        window.addEventListener('offline', this._updateOnlineStatus);

        this._updateOnlineStatus();
    }

    componentWillUmount() {
        window.removeEventListener('online', this._updateOnlineStatus);
        window.removeEventListener('offline', this._updateOnlineStatus);
    }

    _updateOnlineStatus() {
        const { ipcRenderer } = window.require('electron');

        const onlineStatus = navigator.onLine ? 'online' : 'offline';
        ipcRenderer.send('online-status-change-event', onlineStatus);

        this.setState({
            onlineStatus
        });
    }

    render() {
        return (
            <div className="content-header-component">
                {this.state.onlineStatus ?
                    <span className="online-status online">Online</span> :
                    <span className="online-status offline">Offline</span>
                }
            </div>
        );
    }
}
