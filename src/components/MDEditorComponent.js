import React, { PureComponent } from 'react';
import { Input, Switch, Icon } from 'antd';

import './md-editor-component.less';

const { TextArea } = Input;

export default class MDEditorComponent extends PureComponent {
    state = {
        editMode: true
    }

    _toggleEditorMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    render() {
        return (
            <div className="md-editor-component">
                <Switch
                  checkedChildren={<Icon type="eye-o" />}
                  unCheckedChildren={<Icon type="edit" />}
                  onChange={::this._toggleEditorMode}
                />
                { this.state.editMode && <TextArea className="md-editor" /> }
                { !this.state.editMode && <div className="preview-content markdown-body">
                    this is preview mode
                </div> }
            </div>
        );
    }
}
