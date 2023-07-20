import { ChangeEvent, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import InputSelector from '../InputSelector';

interface ComponentNodeProps {
    id: string;
    data: any;
    componentType: string;
    renderInputs: (currentInputValues: { [key: string]: string }, handleInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void) => JSX.Element;
}

function ComponentNode({ id, data, componentType, renderInputs }: ComponentNodeProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [savedInputValues, setSavedInputValues] = useState<{ [key: string]: string }>({});
    const [currentInputValues, setCurrentInputValues] = useState<{ [key: string]: string }>({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleShowDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
            setIsDialogOpen(false);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentInputValues((prevInputValues) => ({
            ...prevInputValues,
            [event.target.id]: event.target.value,
        }));
    };

    const handleCancel = () => {
        setCurrentInputValues(savedInputValues);
        handleCloseDialog();
    };

    const handleConfirm = () => {
        data.component.input = currentInputValues;
        setSavedInputValues(currentInputValues);
        handleCloseDialog();
    };

    return (
        <div className="node component" onDoubleClick={handleShowDialog}>
            <Handle type="target" position={Position.Top} />
            <p>{componentType} Component</p>
            <img className='component-icon' src={`/${componentType.toLowerCase()}.png`} width={20} />
            <dialog ref={dialogRef} className="nodrag" >
                <form>
                    <InputSelector id={id} update={isDialogOpen} />
                    {renderInputs(currentInputValues, handleInputChange)} { }
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

export default ComponentNode;
