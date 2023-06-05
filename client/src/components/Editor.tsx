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
    ConnectionLineType,
    MarkerType,
} from 'reactflow';
import Sidebar from './Sidebar';
import PipelineExporter from './PipelineExporter';
import PythonComponentNode from './nodes/PythonComponentNode';
import PythonComponent from '../models/PythonComponent';
import UrlComponentNode from './nodes/UrlComponentNode';
import UrlComponent from '../models/UrlComponent';

//import 'reactflow/dist/base.css';
import 'reactflow/dist/style.css';
import './Editor.css';

const nodeTypes: NodeTypes = { pythonComponent: PythonComponentNode, urlComponent: UrlComponentNode };
const edgeStyles = { type: 'smoothstep', style: { strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed } }

const initialNodes: Node[] = [
    { id: 'n-1', type: 'pythonComponent', position: { x: 10, y: 10 }, data: { component: new PythonComponent('test-name', 'test-code') } },
    { id: 'n-2', type: 'urlComponent', position: { x: 10, y: 210 }, data: { component: new UrlComponent('test-name', 'test-url') } },
];
const initialEdges: Edge[] = [{ id: 'e-1-2', source: 'n-1', sourceHandle: 'h-1', target: 'n-2', ...edgeStyles }];

const flowKey = 'pipeline';

let id = initialNodes.length + 1;
const getId = () => `n-${id++}`;

function Editor() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>(null as any);

    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [reactFlowInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const storageItem = localStorage.getItem(flowKey);
            const flow = storageItem ? JSON.parse(storageItem) : null;

            if (flow) {
                setNodes(flow.nodes);
                setEdges(flow.edges);
            }
        };

        restoreFlow();
    }, [setNodes]);

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, ...edgeStyles }, eds)), [setEdges]);

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
                data: {}
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
                        connectionLineType={ConnectionLineType.Straight}
                        connectionLineStyle={{ strokeWidth: 3 }}
                    >
                        <Panel position='bottom-right'><PipelineExporter /></Panel>
                        <Panel position="top-right">
                            <button onClick={onSave}>Save</button>
                            <button onClick={onRestore}>Restore</button>
                        </Panel>
                        <Controls showFitView={false} showInteractive={false} />
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
}

export default Editor;