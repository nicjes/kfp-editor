import { ChangeEvent, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';

type InputChangeEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;

export interface RenderInputsProps {
    currentInputValues: { [key: string]: string };
    handleInputChange: (event: InputChangeEvent) => void;
    update: boolean;
}

interface ComponentNodeProps {
    data: any;
    componentType: string;
    renderInputs: (props: RenderInputsProps) => JSX.Element;
}

function ComponentNode({ data, componentType, renderInputs }: ComponentNodeProps) {
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

    const handleInputChange = (event: InputChangeEvent) => {
        setCurrentInputValues((prevInputValues) => ({
            ...prevInputValues,
            [event.target.name]: event.target.value,
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

    const renderImage = () => {
        const img = new Image()
        img.src = `/${componentType.toLowerCase()}.png`;
        if (img.complete) {
            return <img className='component-icon' src={img.src} width={20} />;
        } else {
            return <></>;
        }
    }

    return (
        <div className="node component" onDoubleClick={handleShowDialog}>
            <Handle type="target" position={Position.Top} />
            <p>{componentType} Component</p>
            {renderImage()}
            <dialog ref={dialogRef} className="nodrag" >
                <form>
                    {renderInputs({ currentInputValues, handleInputChange, update: isDialogOpen })} { }
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
