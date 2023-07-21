import { ChangeEvent, useEffect } from 'react';
import { NodeProps } from 'reactflow';

import HelloworldComponent from '../../models/HelloworldComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

function HelloworldComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new HelloworldComponent('', '');
    }, []);


    const renderInputs = ({ currentInputValues, handleInputChange, update }: RenderInputsProps) => {
        const extractInput = (event: ChangeEvent<HTMLInputElement>) => {
            handleInputChange({ field: event.target.name, value: event.target.value });
        };

        return (
            <>
                <label htmlFor="helloInput">Hello ...</label>
                <p><input id="helloInput" name="Hello" value={currentInputValues["Hello"] || ""} onChange={extractInput} /></p>
                <InputSelector field="Hello" nodeId={id} update={update} onClick={handleInputChange} />
                <label htmlFor="secondInput">...</label>
                <p><input id="secondInput" name="Second Hello" value={currentInputValues["Second Hello"] || ""} onChange={extractInput} /></p>
                <InputSelector field="Second Hello" nodeId={id} update={update} onClick={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="Hello World" renderInputs={renderInputs} />
    );
}

export default HelloworldComponentNode;

