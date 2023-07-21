import { useEffect, useState } from "react";

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

    const handleClick = (event: React.MouseEvent, item: { field: string; value: string }) => {
        event.preventDefault();
        onClick(item);
    };

    return (
        <div>
            {receivedData.map((item) => (
                <div key={item.nodeId}>
                    {item.data &&
                        Object.entries(item.data).map(([key, value]) => (
                            <button key={key} id={field} name={field} value={value} onClick={(e) => handleClick(e, { field, value })}>
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
