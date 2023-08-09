import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import UrlComponent from '../../models/UrlComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

function UrlComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new UrlComponent('', '');
        data.description = 'This component can be used to load another component from a URL.';
    }, []);


    const renderInputs = ({ currentInputValues, handleInputChange, extractInput, update }: RenderInputsProps) => {
        return (
            <>
                <label htmlFor="urlInput">Paste your URL:</label>
                <p><input id="urlInput" name="URL" value={currentInputValues["URL"] || ""} onChange={extractInput} /></p>
                <InputSelector field="URL" nodeId={id} update={update} onClick={handleInputChange} />
            </>
        );
    };

    return (
        <ComponentNode data={data} componentType="URL" renderInputs={renderInputs} />
    );
}

export default UrlComponentNode;
