import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import DatasetComponent from '../../models/DatasetComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

/**
 * React component representing a node for a dataset component.
 * @param {NodeProps} id - NodeProps containing the node's ID and data.
 */
function DatasetComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new DatasetComponent('', '');
        data.description = 'This component can be used to load a dataset from a CSV file.';
    }, []);

    /**
     * Render input fields for the DatasetComponentNode.
     * @param {RenderInputsProps} param0 - RenderInputsProps containing input-related functions and data.
     * @returns {JSX.Element} - JSX element representing the input fields.
     */
    const renderInputs = ({ currentInputValues, handleInputChange, extractInput, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor='fileInput'>Select your Dataset:</label>
                <p><input type='file' id='fileInput' name='Dataset' value={currentInputValues['Dataset'] || ''} accept='.csv' onChange={extractInput} /></p>
                <InputSelector field="Dataset" nodeId={id} update={update} onClick={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="Dataset" renderInputs={renderInputs} />
    );
}

export default DatasetComponentNode;
