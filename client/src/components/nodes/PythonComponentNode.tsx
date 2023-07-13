import { ChangeEvent, useEffect } from 'react';
import { NodeProps } from 'reactflow';

import PythonComponent from '../../models/PythonComponent';
import ComponentNode from './ComponentNode';

function PythonComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new PythonComponent('', '');
    }, []);


    const renderInputs = (currentInputValues: { [key: string]: string }, handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void) => {
        return (
            <>
                <label htmlFor='codeInput'>Paste your Python Code:</label>
                <p><textarea id='codeInput' value={currentInputValues['codeInput'] || ''} onChange={handleInputChange} /></p>
            </>
        );
    };

    return (
        <ComponentNode id={id} data={data} componentType="Python" renderInputs={renderInputs} />
    );
}

export default PythonComponentNode;
