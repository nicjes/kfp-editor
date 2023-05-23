import { DragEvent, useCallback, useRef, useState } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    ReactFlowProvider,
    Panel,
    NodeTypes,
    Node,
    ReactFlowInstance,
} from 'reactflow';
import Sidebar from './Sidebar';
import PipelineExporter from './PipelineExporter';
import PythonComponentNode from './PythonComponentNode';

//import 'reactflow/dist/base.css';
import 'reactflow/dist/style.css';
import './Editor.css';

const nodeTypes: NodeTypes = { pythonComponent: PythonComponentNode };

const initialNodes: Node[] = [
    { id: 'n-1', type: 'pythonComponent', position: { x: 10, y: 10 }, data: { label: 'Component 1' } },
    { id: 'n-2', position: { x: 10, y: 210 }, data: { label: 'Component 2' } },
    { id: 'n-3', position: { x: 10, y: 310 }, data: { label: 'Component 3' } },
];
const initialEdges: Edge[] = [{ id: 'e-1-2', source: 'n-1', sourceHandle: 'h-1', target: 'n-2' }];

let id = 4;
const getId = () => `n-${id++}`;

function Editor() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>(null as any);

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
                        nodeTypes={nodeTypes}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        proOptions={{ hideAttribution: true }}
                        zoomOnDoubleClick={false}
                        deleteKeyCode={['Backspace', 'Delete']}
                        multiSelectionKeyCode={['ControlLeft', 'ControlRight', 'OSLeft', 'OSRight']}
                    >
                        <Panel position='bottom-right'><PipelineExporter /></Panel>
                        <Controls showFitView={false} showInteractive={false} />
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
}

export default Editor;