import { ChangeEvent, useEffect } from 'react';
import { NodeProps } from 'reactflow';

import HelloworldComponent from '../../models/HelloworldComponent';
import ComponentNode from './ComponentNode';

function HelloworldComponentNode({ id, data }: NodeProps) {
    useEffect(() => {
        data.component = new HelloworldComponent('', '');
    }, []);


    const renderInputs = (currentInputValues: { [key: string]: string }, handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <>
                <label htmlFor="helloInput">Hello ...</label>
                <p><input id="urlIhelloInputnput" value={currentInputValues["helloInput"] || ""} onChange={handleInputChange} /></p>
                <label htmlFor="secondInput">...</label>
                <p><input id="secondInput" value={currentInputValues["secondInput"] || ""} onChange={handleInputChange} /></p>
            </>
        );
    };

    return (
        <ComponentNode id={id} data={data} componentType="Hello World" renderInputs={renderInputs} />
    );
}

export default HelloworldComponentNode;

