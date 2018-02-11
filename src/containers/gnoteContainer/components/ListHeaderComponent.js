import React, { PureComponent } from 'react';
import { Button } from 'antd';

import './list-header-component.less';

export default class ListHeaderComponent extends PureComponent {
    _createGNote() {
        location.hash = '/edit';
    }

    render() {
        return (
            <div className="list-header-component">
                <Button
                  type="primary"
                  size="small"
                  shape="circle"
                  icon="plus"
                  onClick={::this._createGNote}
                />
                <Button
                  size="small"
                  shape="circle"
                  icon="reload"
                />
            </div>
        );
    }
}
