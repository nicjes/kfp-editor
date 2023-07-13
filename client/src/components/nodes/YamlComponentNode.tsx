import { ChangeEvent, useEffect } from 'react';
import { NodeProps } from 'reactflow';

import YamlComponent from '../../models/YamlComponent';
import ComponentNode from './ComponentNode';

function YamlComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new YamlComponent('', '');
    }, []);


    const renderInputs = (currentInputValues: { [key: string]: string }, handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <>
                <label htmlFor='fileInput'>Select your Component YAML File:</label>
                <p><input type='file' id='fileInput' value={currentInputValues['fileInput'] || ''} accept='.yaml' onChange={handleInputChange} /></p>
            </>
        );
    };

    return (
        <ComponentNode id={id} data={data} componentType="YAML" renderInputs={renderInputs} />
    );
}

export default YamlComponentNode;
