import { useEffect, useState } from "react";

import './InputSelector.css';

import useStore from "./state-store";

interface ReceivedData {
    nodeId: string;
    data: { [key: string]: string };
}

interface InputSelectorProps {
    field: string;
    nodeId: string;
    update: boolean;
    onClick: (item: { field: string; value: string }) => void;
}

function InputSelector({ field, nodeId, update, onClick }: InputSelectorProps) {
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
                if (node && node.data && node.data.input) {
                    updatedReceivedData.push({
                        nodeId: nodeId,
                        data: node.data.input,
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

    return (
        <div className="selector-container">
            {receivedData.map((item) => (
                <div className="selector-node" key={item.nodeId}>
                    <p>{item.nodeId}: </p>
                    {item.data &&
                        Object.entries(item.data).map(([key, value]) => (
                            <span className="selector-item" key={key} onClick={() => onClick({ field, value })}>
                                {`${key}: ${value}`}
                            </span>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default InputSelector;
