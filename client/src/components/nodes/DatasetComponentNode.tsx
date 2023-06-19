import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import DatasetComponent from '../../models/DatasetComponent';

function DatasetComponentNode({ data }: NodeProps) {
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
        data.component = new DatasetComponent('', '');
    }, []);


    return (
        <div className="node component" onDoubleClick={handleShowDialog}>
            <Handle type="target" position={Position.Top} />
            <p>Dataset Component</p>
            <img className='component-icon' src='src\assets\dataset.png' width={20}></img>
            <dialog ref={dialogRef} className="nodrag" >
                <form>
                    <label htmlFor='fileInput'>Select your Component Dataset:</label>
                    <p><input type='file' id='fileInput' value={currentInputValue} accept='.csv' onChange={handleInputChange} /></p>
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

export default DatasetComponentNode;
