import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import PythonComponent from '../../models/PythonComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

function PythonComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new PythonComponent('', '');
    }, []);


    const renderInputs = ({ currentInputValues, handleInputChange, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor='codeInput'>Paste your Python Code:</label>
                <p><textarea id='codeInput' name='Python' value={currentInputValues['Python'] || ''} onChange={handleInputChange} /></p>
                <InputSelector name="Python" nodeId={id} update={update} onChange={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="Python" renderInputs={renderInputs} />
    );
}

export default PythonComponentNode;
