import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import YamlComponent from '../../models/YamlComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

function YamlComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new YamlComponent('', '');
    }, []);


    const renderInputs = ({ currentInputValues, handleInputChange, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor='fileInput'>Select your Component YAML File:</label>
                <p><input type='file' id='fileInput' name='YAML' value={currentInputValues['YAML'] || ''} accept='.yaml' onChange={handleInputChange} /></p>
                <InputSelector name="YAML" nodeId={id} update={update} onChange={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="YAML" renderInputs={renderInputs} />
    );
}

export default YamlComponentNode;
