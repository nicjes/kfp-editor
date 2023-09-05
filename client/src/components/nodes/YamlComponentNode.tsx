import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import YamlComponent from '../../models/YamlComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

/**
 * React component representing a node for a YAML component.
 * @param {NodeProps} id - NodeProps containing the node's ID and data.
 */
function YamlComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new YamlComponent('', '');
        data.description = 'This component can be used to load another component from a YAML file.';
    }, []);

    /**
     * Render input fields for the YamlComponentNode.
     * @param {RenderInputsProps} param0 - RenderInputsProps containing input-related functions and data.
     * @returns {JSX.Element} - JSX element representing the input fields.
     */
    const renderInputs = ({ currentInputValues, handleInputChange, extractInput, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor='fileInput'>Select your Component YAML File:</label>
                <p><input type='file' id='fileInput' name='YAML' value={currentInputValues['YAML'] || ''} accept='.yaml' onChange={extractInput} /></p>
                <InputSelector field="YAML" nodeId={id} update={update} onClick={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="YAML" renderInputs={renderInputs} />
    );
}

export default YamlComponentNode;
