import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import HelloworldComponent from '../../models/HelloworldComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

function HelloworldComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new HelloworldComponent('', '');
    }, []);


    const renderInputs = ({ currentInputValues, handleInputChange, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor="helloInput">Hello ...</label>
                <p><input id="helloInput" name="Hello" value={currentInputValues["Hello"] || ""} onChange={handleInputChange} /></p>
                <InputSelector name="Hello" nodeId={id} update={update} onChange={handleInputChange} />
                <label htmlFor="secondInput">...</label>
                <p><input id="secondInput" value={currentInputValues["secondInput"] || ""} onChange={handleInputChange} /></p>
                <InputSelector name="Second Hello" nodeId={id} update={update} onChange={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="Hello World" renderInputs={renderInputs} />
    );
}

export default HelloworldComponentNode;

