import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import UrlComponent from '../../models/UrlComponent';

function UrlComponentNode({ data }: NodeProps) {
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
        data.component.url = currentInputValue;
        setSavedInputValue(currentInputValue);
        handleCloseDialog();
    };

    useEffect(() => {
        data.component = new UrlComponent('', '');
    }, []);


    return (
        <div className="node" onDoubleClick={handleShowDialog}>
            <Handle type="target" position={Position.Top} />
            <p>URL Component</p>
            <dialog ref={dialogRef} className="nodrag" >
                <form>
                    <label htmlFor='urlInput'>Paste your URL:</label>
                    <p><input type='url' id='urlInput' value={currentInputValue} onChange={handleInputChange} /></p>
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

export default UrlComponentNode;
