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
            <div className="component input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Component
            </div>
            <div className="component" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Component
            </div>
            <div className="component output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Component
            </div>
        </aside>
    );
};

export default Sidebar;