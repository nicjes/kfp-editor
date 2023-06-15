import { DragEvent } from 'react';

import './Sidebar.css';

function Sidebar() {
    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className='sidebar'>
            <h4 className='hub-heading'>Component Hub</h4>
            <div className="node hub-node url" onDragStart={(event) => onDragStart(event, 'urlComponent')} draggable>
                URL Component
            </div>
            <div className="node hub-node python" onDragStart={(event) => onDragStart(event, 'pythonComponent')} draggable>
                Python Component
            </div>
            <div className="node hub-node yaml" onDragStart={(event) => onDragStart(event, 'yamlComponent')} draggable>
                YAML Component
            </div>
        </aside>
    );
};

export default Sidebar;