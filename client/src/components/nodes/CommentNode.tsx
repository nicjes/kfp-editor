import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

/**
 * React component representing a comment node.
 * @param {NodeProps} data - NodeProps containing data for the comment node.
 */
function CommentNode({ data }: NodeProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [savedInputValue, setSavedInputValue] = useState('');
    const [currentInputValue, setCurrentInputValue] = useState('');

    /**
     * Show the comment dialog.
     */
    const handleShowDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    /**
     * Close the comment dialog.
     */
    const handleCloseDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    /**
     * Handle input change for the comment.
     * @param {ChangeEvent<HTMLInputElement>} event - Input change event.
     */
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentInputValue(event.target.value);
    };

    /**
     * Handle cancel action for the comment.
     */
    const handleCancel = () => {
        setCurrentInputValue(savedInputValue);
        handleCloseDialog();
    };

    /**
     * Handle confirm action for the comment.
     */
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
