import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import UrlComponent from '../../models/UrlComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

function UrlComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new UrlComponent('', '');
    }, []);


    const renderInputs = ({ currentInputValues, handleInputChange, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor="urlInput">Paste your URL:</label>
                <p><input id="urlInput" name="URL" value={currentInputValues["URL"] || ""} onChange={handleInputChange} /></p>
                <InputSelector name="URL" nodeId={id} update={update} onChange={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="URL" renderInputs={renderInputs} />
    );
}

export default UrlComponentNode;
