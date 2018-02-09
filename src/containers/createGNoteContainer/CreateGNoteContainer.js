import React, { PureComponent } from 'react';
import { Input, Button } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import CreateGNoteDomain from './CreateGNoteDomain';

import MDEditorComponent from '../../components/MDEditorComponent';

import './create-gnote-container.less';

const ButtonGroup = Button.Group;

const mapper = {
    modelMapper: () => {},
    actionMapper: (action) => {
        return {
            createNote: action.createNote
        };
    }
};

@DomainComponentCreator(CreateGNoteDomain)
@DomainMapper(mapper)
export default class CreateGNoteContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            commitMsg: '',
            content: ''
        };
    }

    _onNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    _onCommitMsgChange(e) {
        this.setState({
            commitMsg: e.target.value
        });
    }

    _onContentChange(value) {
        this.setState({
            content: value
        });
    }

    _onSave() {
        const { createNote } = this.props;
        const { name, commitMsg, content } = this.state;
        createNote(name, commitMsg, content);

        history.back();
    }

    _onCancel() {
        history.back();
    }

    render() {
        return (
            <div className="create-gnote-container">
                <div className="basic-info-wrapper">
                    <Input
                      className="file-name-input"
                      placeholder="file name"
                      value={this.state.name}
                      onChange={::this._onNameChange}
                    />
                    <Input
                      className="commit-msg-input"
                      placeholder="commit message"
                      value={this.state.commitMsg}
                      onChange={::this._onCommitMsgChange}
                    />
                </div>
                <MDEditorComponent content={this.state.content} callback={::this._onContentChange} />
                <div>
                    <ButtonGroup>
                        <Button icon="save" onClick={::this._onSave} disabled={this.state.name === ''}>save</Button>
                        <Button onClick={::this._onCancel}>Cancel</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
