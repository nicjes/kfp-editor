import { DragEvent } from 'react';

import './Sidebar.css';

function Sidebar() {
    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className='sidebar'>
            <h4 className='heading hub'>Component Hub</h4>
            <div className="component" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Component
            </div>
            <div className="component url" onDragStart={(event) => onDragStart(event, 'urlComponent')} draggable>
                URL Component
            </div>
            <div className="component python" onDragStart={(event) => onDragStart(event, 'pythonComponent')} draggable>
                Python Component
            </div>
        </aside>
    );
};

export default Sidebar;