import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

function CommentNode({ data }: NodeProps) {
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
        data.comment = currentInputValue;
        setSavedInputValue(currentInputValue);
        handleCloseDialog();
    };

    useEffect(() => {
        data.comment = '';
    }, []);


    return (
        <div className="node comment" onDoubleClick={handleShowDialog}>
            <p>{savedInputValue}</p>
            <dialog ref={dialogRef} className="nodrag" >
                <form>
                    <label htmlFor='commentInput'>Add a comment:</label>
                    <p><input id='commentInput' value={currentInputValue} onChange={handleInputChange} /></p>
                    <div>
                        <button onClick={handleCancel} type="button">Cancel</button>
                        <button onClick={handleConfirm} type="button">Confirm</button>
                    </div>
                </form>
            </dialog>
            <Handle type="source" position={Position.Left} />
        </div>
    );
}

export default CommentNode;
