import { DragEvent } from 'react';

import './Sidebar.css';

/**
 * Sidebar component for displaying and dragging nodes from the component hub.
 */
function Sidebar() {
    /**
     * Handles the drag start event for a specific node type.
     * @param {DragEvent} event - The drag start event.
     * @param {string} nodeType - The type of the node being dragged.
     */
    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className='sidebar'>
            <div className='hub'>
                <h4 id='hub-heading'>Component Hub</h4>
                <div className="node component hub-node yaml" onDragStart={(event) => onDragStart(event, 'yamlComponent')} draggable>
                    <p>YAML Component</p>
                    <img className='component-icon' src='.\yaml.png' width={20}></img>
                </div>
                <div className="node component hub-node url" onDragStart={(event) => onDragStart(event, 'urlComponent')} draggable>
                    <p>URL Component</p>
                    <img className='component-icon' src='.\url.png' width={20}></img>
                </div>
                <div className="node component hub-node python" onDragStart={(event) => onDragStart(event, 'pythonComponent')} draggable>
                    <p>Python Component</p>
                    <img className='component-icon' src='.\python.png' width={20}></img>
                </div>
                <div className="node component hub-node dataset" onDragStart={(event) => onDragStart(event, 'datasetComponent')} draggable>
                    <p>Dataset Component</p>
                    <img className='component-icon' src='.\dataset.png' width={20}></img>
                </div>
                <div className="node component hub-node hello" onDragStart={(event) => onDragStart(event, 'helloworldComponent')} draggable>
                    <p>Hello World Component</p>
                </div>
                <hr />
                <div className="node comment hub-node" onDragStart={(event) => onDragStart(event, 'comment')} draggable>
                    <p>Comment</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
