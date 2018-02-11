import React, { PureComponent } from 'react';
import { Input, Switch, Icon } from 'antd';
import { markdown } from 'markdown';

import './md-editor-component.less';

const { TextArea } = Input;

export default class MDEditorComponent extends PureComponent {
    state = {
        editMode: true,
        content: this.props.content || ''
    }

    _toggleEditorMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    _onContentChange(e) {
        this.setState({
            content: e.target.value
        });

        const { callback } = this.props;
        if (callback) {
            callback(e.target.value);
        }
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
        return (
            <div className="md-editor-component">
                <Switch
                  checkedChildren={<Icon type="eye-o" />}
                  unCheckedChildren={<Icon type="edit" />}
                  onChange={::this._toggleEditorMode}
                  size="small"
                />
                { this.state.editMode && <TextArea
                  value={this.state.content}
                  className="md-editor"
                  onChange={::this._onContentChange}
                /> }
                { !this.state.editMode && <div className="preview-content">
                    {::this._convertToHTML(markdown.toHTML(this.state.content))}
                </div> }
            </div>
        );
    }
}
