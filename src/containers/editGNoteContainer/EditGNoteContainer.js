import React, { PureComponent } from 'react';
import { Input, Button, message, Checkbox } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import DomainMapper from '../../utils/DomainMapper';
import EditGNoteDomain from './EditGNoteDomain';

import MDEditorComponent from '../../components/MDEditorComponent';

import debounce from '../../utils/debounce';

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
            getNoteData: action.getNoteData
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
            createMode: true,
            isAutoSave: true
        };

        this._autoSaveHandler = debounce(::this._autoSave, 5000);
    }

    componentWillMount() {
        const { location, getNoteData } = this.props;
        if (location.query.name !== undefined) {
            const data = getNoteData(location.query.name);
            this.setState({
                name: location.query.name,
                content: data.content,
                commitMsg: data.commitMsg,
                createMode: false
            });
        }
    }

    shouldComponentUpdate() {
        if (!this.state.createMode) {
            this._autoSaveHandler();
        }

        return true;
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

        try {
            saveNote(this.state.createMode, name, commitMsg, content);
            history.back();
        } catch (e) {
            message.error(e.message, 5);
        }
    }

    _onCancel() {
        history.back();
    }

    _autoSave() {
        if (this.state.isAutoSave) {
            const { saveNote } = this.props;
            const { name, commitMsg, content } = this.state;

            try {
                saveNote(false, name, commitMsg, content);
                message.success('Auto saved!', 2);
            } catch (e) {
                message.error(e.message, 5);
            }
        }
    }

    _toggleAutoSave(e) {
        this.setState({
            isAutoSave: e.target.value
        });
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
                    {!this.state.createMode && <Checkbox
                      onChange={::this._toggleAutoSave}
                      checked={this.state.isAutoSave}
                    >
                        AutoSave
                    </Checkbox>}
                    <ButtonGroup className="btn-group">
                        <Button icon="save" onClick={::this._onSave} disabled={this.state.name === ''}>save</Button>
                        <Button onClick={::this._onCancel}>Cancel</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
