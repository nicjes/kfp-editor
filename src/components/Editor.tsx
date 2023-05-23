import { DragEvent, useCallback, useRef, useState } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    ReactFlowProvider,
} from 'reactflow';
import Sidebar from './Sidebar';

import 'reactflow/dist/style.css';
import './Editor.css';

const initialNodes = [
    { id: '1', position: { x: 10, y: 10 }, data: { label: '1' } },
    { id: '2', position: { x: 10, y: 110 }, data: { label: '2' } },
    { id: '3', position: { x: 10, y: 210 }, data: { label: '3' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const proOptions = { hideAttribution: true };

let id = 3;
const getId = () => `component_${id++}`;

function Editor() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance?.project({
                x: event.clientX - reactFlowBounds!.left,
                y: event.clientY - reactFlowBounds!.top,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} component` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    return (
        <div className='editor' style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        proOptions={proOptions}
                    >
                        <Controls showFitView={false} showInteractive={false} />
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
}

export default Editor;