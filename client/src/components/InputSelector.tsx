import { useEffect, useState } from "react";

import useStore from "./state-store";

interface ReceivedData {
    nodeId: string;
    data: { [key: string]: string };
}

function InputSelector({ id, update }: { id: string; update: boolean }) {
    const [receivedData, setReceivedData] = useState<ReceivedData[]>([]);

    const { reactFlowInstance } = useStore();

    const updateReceivedData = () => {
        const flow = reactFlowInstance?.toObject();

        if (flow) {
            const connectedNodes = flow.edges
                .filter((edge) => edge.target === id)
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

    return (
        <div>
            {receivedData.map((item) => (
                <div key={item.nodeId}>
                    {item.data &&
                        Object.entries(item.data).map(([key, value]) => (
                            <p key={key}>{`${key}: ${value}`}</p>
                        ))}
                </div>
            ))}
            <hr />
        </div>
    );
}

export default InputSelector;
