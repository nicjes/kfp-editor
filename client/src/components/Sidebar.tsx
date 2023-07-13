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
            <div className="node component hub-node yaml" onDragStart={(event) => onDragStart(event, 'yamlComponent')} draggable>
                <p>YAML Component</p>
                <img className='component-icon' src='src\assets\yaml.png' width={20}></img>
            </div>
            <div className="node component hub-node url" onDragStart={(event) => onDragStart(event, 'urlComponent')} draggable>
                <p>URL Component</p>
                <img className='component-icon' src='src\assets\url.png' width={20}></img>
            </div>
            <div className="node component hub-node python" onDragStart={(event) => onDragStart(event, 'pythonComponent')} draggable>
                <p>Python Component</p>
                <img className='component-icon' src='src\assets\python.png' width={20}></img>
            </div>
            <div className="node component hub-node dataset" onDragStart={(event) => onDragStart(event, 'datasetComponent')} draggable>
                <p>Dataset Component</p>
                <img className='component-icon' src='src\assets\dataset.png' width={20}></img>
            </div>
            <div className="node component hub-node hello" onDragStart={(event) => onDragStart(event, 'helloworldComponent')} draggable>
                <p>Hello World Component</p>
            </div>
            <hr />
            <div className="node comment hub-node" onDragStart={(event) => onDragStart(event, 'comment')} draggable>
                <p>Comment</p>
            </div>
        </aside>
    );
};

export default Sidebar;