import { ChangeEvent, useState } from 'react';

import './ComponentDialog.css';

import { RenderInputsProps } from './nodes/ComponentNode';

/**
 * Props for the ComponentDialog component.
 */
interface ComponentDialogProps {
    data: any;
    dialogRef: React.RefObject<HTMLDialogElement>;
    renderInputs: (props: RenderInputsProps) => JSX.Element;
    handleCloseDialog: () => void;
    update: boolean;
}

/**
 * A dialog component for rendering and editing component properties.
 * @param {ComponentDialogProps} props - The ComponentDialogProps containing component data and functions.
 */
function ComponentDialog({ data, dialogRef, renderInputs, handleCloseDialog, update }: ComponentDialogProps) {
    const [savedInputValues, setSavedInputValues] = useState<{ [key: string]: string }>({});
    const [currentInputValues, setCurrentInputValues] = useState<{ [key: string]: string }>({});

    /**
     * Handle cancel button click.
     */
    const handleCancel = () => {
        setCurrentInputValues(savedInputValues);
        handleCloseDialog();
    };

    /**
     * Handle confirm button click.
     */
    const handleConfirm = () => {
        data.input = currentInputValues;
        setSavedInputValues(currentInputValues);
        handleCloseDialog();
    };

    /**
     * Handle input field change.
     * @param {item} item - An object containing the field and value to update.
     */
    const handleInputChange = (item: { field: string; value: string }) => {
        setCurrentInputValues((prevInputValues) => ({
            ...prevInputValues,
            [item.field]: item.value,
        }));
    };

    /**
     * Extract input values from input elements.
     * @param {ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>} event - The input change event.
     */
    const extractInput = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange({ field: event.target.name, value: event.target.value });
    };

    return (
        <dialog ref={dialogRef} className="component-dialog nodrag" >
            <h2>{data.type} Component</h2>
            <div className="dialog-description">
                <p>{data.description}</p>
            </div>
            <form className="dialog-form">
                <div className="dialog-inputs">
                    {renderInputs({ currentInputValues, handleInputChange, extractInput, update })}
                </div>
                <div className="dialog-buttons">
                    <button id="dialog-cancel" onClick={handleCancel} type="button">Cancel</button>
                    <button id="dialog-confirm" onClick={handleConfirm} type="button">Confirm</button>
                </div>
            </form>
        </dialog>
    );
}

export default ComponentDialog;
