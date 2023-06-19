import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import YamlComponent from '../../models/YamlComponent';

function YamlComponentNode({ data }: NodeProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [savedInputValue, setSavedInputValue] = useState('');
    const [currentInputValue, setCurrentInputValue] = useState('');

    const handleShowDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const handleCloseDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentInputValue(event.target.value);
    };

    const handleCancel = () => {
        setCurrentInputValue(savedInputValue);
        handleCloseDialog();
    };

    const handleConfirm = () => {
        data.component.code = currentInputValue;
        setSavedInputValue(currentInputValue);
        handleCloseDialog();
    };

    useEffect(() => {
        data.component = new YamlComponent('', '');
    }, []);


    return (
        <div className="node component" onDoubleClick={handleShowDialog}>
            <Handle type="target" position={Position.Top} />
            <p>YAML Component</p>
            <dialog ref={dialogRef} className="nodrag" >
                <form>
                    <label htmlFor='fileInput'>Upload your Component YAML File:</label>
                    <p><input type='file' id='fileInput' value={currentInputValue} accept='.yaml' onChange={handleInputChange} /></p>
                    <div>
                        <button onClick={handleCancel} type="button">Cancel</button>
                        <button onClick={handleConfirm} type="button">Confirm</button>
                    </div>
                </form>
            </dialog>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default YamlComponentNode;
