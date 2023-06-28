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
    updateEdge,
} from 'reactflow';
import Sidebar from './Sidebar';
import PipelineExporter from './PipelineExporter';
import PipelineSaver from './PipelineSaver';
import PipelineRestorer from './PipelineRestorer';
import CommentNode from './nodes/CommentNode';
import PythonComponentNode from './nodes/PythonComponentNode';
import PythonComponent from '../models/PythonComponent';
import UrlComponentNode from './nodes/UrlComponentNode';
import UrlComponent from '../models/UrlComponent';
import YamlComponentNode from './nodes/YamlComponentNode';
import DatasetComponentNode from './nodes/DatasetComponentNode';

import 'reactflow/dist/base.css';
import './Editor.css';

const nodeTypes: NodeTypes = { comment: CommentNode, pythonComponent: PythonComponentNode, urlComponent: UrlComponentNode, yamlComponent: YamlComponentNode, datasetComponent: DatasetComponentNode };
const edgeStyles = {
    componentEdge: { type: 'smoothstep', style: { strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed } },
    commentEdge: { type: 'straight', style: { strokeWidth: 2, strokeDasharray: '4' } },
};

const initialNodes: Node[] = [
    { id: 'n-1', type: 'pythonComponent', position: { x: 10, y: 10 }, data: { component: new PythonComponent('test-name', 'test-code') } },
    { id: 'n-2', type: 'urlComponent', position: { x: 10, y: 210 }, data: { component: new UrlComponent('test-name', 'test-url') } },
    { id: 'n-3', type: 'comment', position: { x: 170, y: 120 }, data: { comment: 'Comment' } },
];

const initialEdges: Edge[] = [
    { id: 'e-1-2', source: 'n-1', target: 'n-2', ...edgeStyles.componentEdge },
    { id: 'c-2', source: 'n-3', target: 'n-2', ...edgeStyles.commentEdge },
];

function Editor() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const edgeUpdateSuccessful = useRef(true);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>(null as any);

    const onConnect = useCallback((params: Edge | Connection) => {
        const type = nodes.find((node) => node.id === params.source)?.type;
        if (type === 'comment') {
            setEdges((eds) => addEdge({ ...params, ...edgeStyles.commentEdge }, eds));
        } else {
            setEdges((eds) => addEdge({ ...params, ...edgeStyles.componentEdge }, eds));
        }
    }, [setEdges, nodes]);

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string; }) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }

        edgeUpdateSuccessful.current = true;
    }, []);

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();

            const id = nodes[nodes.length - 1].id.replace(/\d+$/, (number) => (parseInt(number) + 1).toString());
            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance?.project({
                x: event.clientX - reactFlowBounds!.left,
                y: event.clientY - reactFlowBounds!.top,
            });

            const newNode = {
                id,
                type,
                position,
                data: {}
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, nodes]
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
                        onEdgeUpdate={onEdgeUpdate}
                        onEdgeUpdateStart={onEdgeUpdateStart}
                        onEdgeUpdateEnd={onEdgeUpdateEnd}
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
                        <Panel position='bottom-right'>
                            <PipelineExporter reactFlowInstance={reactFlowInstance} />
                        </Panel>
                        <Panel position="top-right">
                            <PipelineSaver reactFlowInstance={reactFlowInstance} />
                            <PipelineRestorer setNodes={setNodes} setEdges={setEdges} />
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