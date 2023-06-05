import { ChangeEvent, useCallback, useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import UrlComponent from '../../models/UrlComponent';

const handleStyle = { left: 10 };

function UrlComponentNode({ data }: NodeProps) {
    useEffect(() => {
        data.component = new UrlComponent('', '');
    }, []);

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        data.component.url = event.target.value;
    }, []);

    return (
        <div className="node">
            <Handle type="target" position={Position.Top} />
            <div>
                <p>URL Component</p>
                <label>Paste your URL:</label>
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

export default UrlComponentNode;
