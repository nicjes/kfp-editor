import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import HelloworldComponent from '../../models/HelloworldComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

/**
 * React component representing a node for a Hello World component.
 * @param {NodeProps} id - NodeProps containing the node's ID and data.
 */
function HelloworldComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new HelloworldComponent('', '');
        data.description = 'This is a Hello World component.';
    }, []);

    /**
     * Render input fields for the HelloworldComponentNode.
     * @param {RenderInputsProps} param0 - RenderInputsProps containing input-related functions and data.
     * @returns {JSX.Element} - JSX element representing the input fields.
     */
    const renderInputs = ({ currentInputValues, handleInputChange, extractInput, update }: RenderInputsProps) => {
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
