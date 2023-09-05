import { useEffect } from 'react';
import { NodeProps } from 'reactflow';

import UrlComponent from '../../models/UrlComponent';
import ComponentNode, { RenderInputsProps } from './ComponentNode';
import InputSelector from '../InputSelector';

/**
 * React component representing a node for a URL component.
 * @param {NodeProps} id - NodeProps containing the node's ID and data.
 */
function UrlComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new UrlComponent('', '');
        data.description = 'This component can be used to load another component from a URL.';
    }, []);

    /**
     * Render input fields for the UrlComponentNode.
     * @param {RenderInputsProps} param0 - RenderInputsProps containing input-related functions and data.
     * @returns {JSX.Element} - JSX element representing the input fields.
     */
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
