import React, { PureComponent } from 'react';

import DomainMapper from '../../../utils/DomainMapper';

import './content-header-component.less';

const mapper = {
    modelMapper: (model) => {
        return {
            activeNoteName: model.activeNoteName,
            onlineStatus: model.onlineStatus
        };
    },
    actionMapper: (action) => {
        return {
            updateOnlineStatus: action.updateOnlineStatus
        };
    }
};

@DomainMapper(mapper)
export default class ContentHeaderComponent extends PureComponent {
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
        const { updateOnlineStatus } = this.props;
        const { ipcRenderer } = window.require('electron');

        ipcRenderer.send('online-status-change-event', navigator.onLine ? 'online' : 'offline');

        updateOnlineStatus(navigator.onLine);
    }

    render() {
        const { activeNoteName, onlineStatus } = this.props;

        return (
            <div className="content-header-component">
                <span className="active-note-name">
                    {activeNoteName}
                </span>
                {onlineStatus ?
                    <span className="online-status online">Online</span> :
                    <span className="online-status offline">Offline</span>
                }
            </div>
        );
    }
}
