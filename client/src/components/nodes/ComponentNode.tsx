import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import ComponentDialog from '../ComponentDialog';

/**
 * Props for rendering component inputs.
 */
export interface RenderInputsProps {
    currentInputValues: { [key: string]: string };
    handleInputChange: (item: { field: string; value: string }) => void;
    extractInput: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    update: boolean;
}

/**
 * Props for the ComponentNode component.
 */
interface ComponentNodeProps {
    data: any;
    componentType: string;
    renderInputs: (props: RenderInputsProps) => JSX.Element;
}

/**
 * React component representing a component node.
 * @param {ComponentNodeProps} props - ComponentNode props.
 */
function ComponentNode({ data, componentType, renderInputs }: ComponentNodeProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    /**
     * Show the component dialog.
     */
    const handleShowDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            setIsDialogOpen(true);
        }
    };

    /**
     * Close the component dialog.
     */
    const handleCloseDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
            setIsDialogOpen(false);
        }
    };

    useEffect(() => {
        data.type = componentType;
    }, []);

    return (
        <div className={'node component ' + componentType.toLowerCase().replace(/ /g, '')} onDoubleClick={handleShowDialog}>
            <Handle type="target" position={Position.Top} />
            <p>{componentType} Component</p>
            <img
                className='component-icon'
                src={`./${componentType.toLowerCase()}.png`}
                width={20}
                onError={(e) => e.currentTarget.style.display = 'none'}
            />
            <ComponentDialog
                data={data}
                dialogRef={dialogRef}
                renderInputs={renderInputs}
                handleCloseDialog={handleCloseDialog}
                update={isDialogOpen}
            />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default ComponentNode;
