import { ChangeEvent, useState } from 'react';

import './ComponentDialog.css';

import { RenderInputsProps } from './nodes/ComponentNode';

interface ComponentDialogProps {
    data: any;
    dialogRef: React.RefObject<HTMLDialogElement>;
    renderInputs: (props: RenderInputsProps) => JSX.Element;
    handleCloseDialog: () => void;
    update: boolean;
}

function ComponentDialog({ data, dialogRef, renderInputs, handleCloseDialog, update }: ComponentDialogProps) {
    const [savedInputValues, setSavedInputValues] = useState<{ [key: string]: string }>({});
    const [currentInputValues, setCurrentInputValues] = useState<{ [key: string]: string }>({});

    const handleCancel = () => {
        setCurrentInputValues(savedInputValues);
        handleCloseDialog();
    };

    const handleConfirm = () => {
        data.component.input = currentInputValues;
        setSavedInputValues(currentInputValues);
        handleCloseDialog();
    };

    const handleInputChange = (item: { field: string; value: string }) => {
        setCurrentInputValues((prevInputValues) => ({
            ...prevInputValues,
            [item.field]: item.value,
        }));
    };

    const extractInput = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange({ field: event.target.name, value: event.target.value });
    };

    return (
        <dialog ref={dialogRef} className="component-dialog nodrag" >
            <h2>{data.type} Component</h2>
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
