import React, { PureComponent } from 'react';
import { Button } from 'antd';

import './list-header-component.less';

export default class ListHeaderComponent extends PureComponent {
    render() {
        return (
            <div className="list-header-component">
                <Button
                  size="small"
                  shape="circle"
                  icon="reload"
                />
            </div>
        );
    }
}
