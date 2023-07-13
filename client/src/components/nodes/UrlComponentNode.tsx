import { ChangeEvent, useEffect } from 'react';
import { NodeProps } from 'reactflow';

import UrlComponent from '../../models/UrlComponent';
import ComponentNode from './ComponentNode';

function UrlComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new UrlComponent('', '');
    }, []);


    const renderInputs = (currentInputValues: { [key: string]: string }, handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <>
                <label htmlFor="urlInput">Paste your URL:</label>
                <p><input id="urlInput" value={currentInputValues["urlInput"] || ""} onChange={handleInputChange} /></p>
            </>
        );
    };

    return (
        <ComponentNode id={id} data={data} componentType="URL" renderInputs={renderInputs} />
    );
}

export default UrlComponentNode;
