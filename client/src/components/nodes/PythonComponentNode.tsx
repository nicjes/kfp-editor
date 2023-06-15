import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import PythonComponent from '../../models/PythonComponent';

function PythonComponentNode({ data }: NodeProps) {
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

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
        data.component = new PythonComponent('', '');
    }, []);


    return (
        <div className="node" onDoubleClick={handleShowDialog}>
            <Handle type="target" position={Position.Top} />
            <p>Python Component</p>
            <dialog ref={dialogRef} className="nodrag" >
                <form>
                    <label htmlFor='codeInput'>Paste your Python Code:</label>
                    <p><textarea id='codeInput' value={currentInputValue} onChange={handleInputChange} /></p>
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

export default PythonComponentNode;
