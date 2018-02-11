import React, { PureComponent } from 'react';
import { Input, Button } from 'antd';
import { Base64 } from 'js-base64';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import EditGNoteDomain from './EditGNoteDomain';

import MDEditorComponent from '../../components/MDEditorComponent';

import './edit-gnote-container.less';

const ButtonGroup = Button.Group;

const mapper = {
    modelMapper: (model) => {
        return {
            activeNoteName: model.activeNoteName,
            activeNoteContent: model.activeNoteContent
        };
    },
    actionMapper: (action) => {
        return {
            saveNote: action.saveNote,
            getNoteContent: action.getNoteContent
        };
    }
};

@DomainComponentCreator(EditGNoteDomain)
@DomainMapper(mapper)
export default class EditGNoteContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            commitMsg: '',
            content: '',
            createMode: true
        };
    }

    componentWillMount() {
        const { location, getNoteContent } = this.props;
        if (location.query.name !== undefined) {
            const content = getNoteContent(location.query.name);
            this.setState({
                name: location.query.name,
                content: Base64.decode(content),
                createMode: false
            });
        }
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
        const { saveNote } = this.props;
        const { name, commitMsg, content } = this.state;
        saveNote(name, commitMsg, content);

        history.back();
    }

    _onCancel() {
        history.back();
    }

    render() {
        return (
            <div className="edit-gnote-container">
                <div className="basic-info-wrapper">
                    <Input
                      className="file-name-input"
                      placeholder="file name"
                      value={this.state.name}
                      onChange={::this._onNameChange}
                      disabled={!this.state.createMode}
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
