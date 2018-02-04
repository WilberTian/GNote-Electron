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
    actionMapper: () => {}
};

@DomainComponentCreator(CreateGNoteDomain)
@DomainMapper(mapper)
export default class CreateGNoteContainer extends PureComponent {
    render() {
        return (
            <div className="create-gnote-container">
                <Input className="commit-msg-input" placeholder="commit message" />
                <MDEditorComponent />
                <div>
                    <ButtonGroup>
                        <Button icon="save">save</Button>
                        <Button>OK</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
