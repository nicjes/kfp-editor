import { ChangeEvent, useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import './PythonComponentNode.css';

const handleStyle = { left: 10 };

function PythonComponentNode({ data }: NodeProps) {
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    }, []);

    return (
        <div className="node">
            <Handle type="target" position={Position.Top} />
            <div>
                <p>Python Component</p>
                <label>Paste your Python Code:</label>
                <input onChange={onChange} className="nodrag" />
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="h-1"
                style={handleStyle}
            />
            <Handle type="source" position={Position.Bottom} id="h-2" />
        </div>
    );
}

export default PythonComponentNode;
