import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import PythonComponent from '../../models/PythonComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

/**
 * React component representing a node for a Python component.
 * @param {NodeProps} id - NodeProps containing the node's ID and data.
 */
function PythonComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new PythonComponent('', '');
        data.description = 'This component can be used to implement custom Python code.';
    }, []);

    /**
     * Render input fields for the PythonComponentNode.
     * @param {RenderInputsProps} param0 - RenderInputsProps containing input-related functions and data.
     * @returns {JSX.Element} - JSX element representing the input fields.
     */
    const renderInputs = ({ currentInputValues, handleInputChange, extractInput, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor='codeInput'>Paste your Python Code:</label>
                <p><textarea id='codeInput' name='Python' value={currentInputValues['Python'] || ''} onChange={extractInput} /></p>
                <InputSelector field="Python" nodeId={id} update={update} onClick={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="Python" renderInputs={renderInputs} />
    );
}

export default PythonComponentNode;
