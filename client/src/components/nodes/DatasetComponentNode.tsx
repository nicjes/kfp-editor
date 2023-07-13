import { ChangeEvent, useEffect } from 'react';
import { NodeProps } from 'reactflow';

import DatasetComponent from '../../models/DatasetComponent';
import ComponentNode from './ComponentNode';

function DatasetComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new DatasetComponent('', '');
    }, []);


    const renderInputs = (currentInputValues: { [key: string]: string }, handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <>
                <label htmlFor='fileInput'>Select your Dataset:</label>
                <p><input type='file' id='fileInput' value={currentInputValues['fileInput'] || ''} accept='.csv' onChange={handleInputChange} /></p>
            </>
        );
    };

    return (
        <ComponentNode id={id} data={data} componentType="Dataset" renderInputs={renderInputs} />
    );
}

export default DatasetComponentNode;
