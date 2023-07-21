import { ChangeEvent, useEffect, useState } from "react";

import useStore from "./state-store";

interface ReceivedData {
    nodeId: string;
    data: { [key: string]: string };
}

interface InputSelectorProps {
    name: string;
    nodeId: string;
    update: boolean;
    onChange: (event: ChangeEvent<HTMLButtonElement>) => void;
}

function InputSelector({ name, nodeId, update, onChange }: InputSelectorProps) {
    const [receivedData, setReceivedData] = useState<ReceivedData[]>([]);

    const { reactFlowInstance } = useStore();

    const updateReceivedData = () => {
        const flow = reactFlowInstance?.toObject();

        if (flow) {
            const connectedNodes = flow.edges
                .filter((edge) => edge.target === nodeId)
                .map((edge) => edge.source);

            const updatedReceivedData: ReceivedData[] = [];

            for (const nodeId of connectedNodes) {
                const node = flow.nodes.find((node) => node.id === nodeId);
                if (node && node.data && node.data.component && node.data.component.input) {
                    updatedReceivedData.push({
                        nodeId: nodeId,
                        data: node.data.component.input,
                    });
                }
            }

            setReceivedData(updatedReceivedData);
        }
    };

    useEffect(() => {
        if (update) {
            updateReceivedData();
        }
    }, [update]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        onChange(event as unknown as ChangeEvent<HTMLButtonElement>);
    };

    return (
        <div>
            {receivedData.map((item) => (
                <div key={item.nodeId}>
                    {item.data &&
                        Object.entries(item.data).map(([key, value]) => (
                            <button key={key} name={name} value={value} onClick={handleClick}>
                                {`${key}: ${value}`}
                            </button>
                        ))}
                </div>
            ))}
            <hr />
        </div>
    );
}

export default InputSelector;
