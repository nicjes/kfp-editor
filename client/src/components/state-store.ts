import { create } from 'zustand';
import {
    Connection,
    Edge,
    Node,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    NodeTypes,
    MarkerType,
    updateEdge,
    ReactFlowInstance,
} from 'reactflow';

import CommentNode from './nodes/CommentNode';
import PythonComponentNode from './nodes/PythonComponentNode';
import UrlComponentNode from './nodes/UrlComponentNode';
import YamlComponentNode from './nodes/YamlComponentNode';
import DatasetComponentNode from './nodes/DatasetComponentNode';

import PythonComponent from '../models/PythonComponent';
import UrlComponent from '../models/UrlComponent';

import React from 'react';
import HelloWorldComponentNode from './nodes/HelloworldComponentNode';

/**
 * Defines custom node types and edge styles.
 */
const nodeTypes = {
    comment: CommentNode,
    pythonComponent: PythonComponentNode,
    urlComponent: UrlComponentNode,
    yamlComponent: YamlComponentNode,
    datasetComponent: DatasetComponentNode,
    helloworldComponent: HelloWorldComponentNode,
};

/**
 * Defines styles for different types of edges.
 */
const edgeStyles = {
    componentEdge: {
        type: 'smoothstep',
        style: {
            strokeWidth: 3
        },
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    commentEdge: {
        type: 'straight',
        style: {
            strokeWidth: 2,
            strokeDasharray: '4'
        }
    },
};

/**
 * Initial node data for the React Flow application.
 */
const initialNodes: Node[] = [
    {
        id: 'n-1',
        type: 'pythonComponent',
        position: { x: 10, y: 10 },
        data: {
            component: new PythonComponent('test-name', 'test-code')
        }
    },
    {
        id: 'n-2',
        type: 'urlComponent',
        position: { x: 10, y: 210 },
        data: {
            component: new UrlComponent('test-name', 'test-url')
        }
    },
    {
        id: 'n-3',
        type: 'comment',
        position: { x: 170, y: 120 },
        data: {
            comment: 'Comment'
        }
    },
];

/**
 * Initial edge data for the React Flow application.
 */
const initialEdges: Edge[] = [
    {
        id: 'e-1-2',
        source: 'n-1',
        target: 'n-2',
        ...edgeStyles.componentEdge
    },
    {
        id: 'c-2',
        source: 'n-3',
        target: 'n-2',
        ...edgeStyles.commentEdge
    },
];

/**
 * Defines the state store for the React Flow application.
 */
export type RFState = {
    reactFlowInstance?: ReactFlowInstance;
    reactFlowWrapper: React.RefObject<HTMLDivElement>;
    nodeTypes: NodeTypes;
    nodes: Node[];
    edges: Edge[];
    edgeUpdateSuccessful: boolean;
    onInit: (instance: ReactFlowInstance) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onEdgeUpdateStart: () => void;
    onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => void;
    onEdgeUpdateEnd: (_: any, edge: { id: string; }) => void;
    onDragOver: React.DragEventHandler<HTMLDivElement>;
    onDrop: React.DragEventHandler<HTMLDivElement>;
};

/**
 * Creates a Zustand store for managing the state of the React Flow application.
 */
const useStore = create<RFState>((set, get) => ({
    reactFlowWrapper: React.createRef<HTMLDivElement>(),
    nodeTypes: nodeTypes,
    nodes: initialNodes,
    edges: initialEdges,
    edgeUpdateSuccessful: true,
    onInit: (instance) => {
        set({ reactFlowInstance: instance });
    },
    setNodes: (nodes: Node[]) => set({ nodes: nodes }),
    setEdges: (edges: Edge[]) => set({ edges: edges }),
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        get().nodes.find((node) => {
            if (node.id === (connection.source)) {
                const type = node.type;
                if (type === 'comment') {
                    set({
                        edges: addEdge({ ...connection, ...edgeStyles.commentEdge }, get().edges),
                    });
                } else {
                    set({
                        edges: addEdge({ ...connection, ...edgeStyles.componentEdge }, get().edges),
                    });
                }
            }
        });
    },
    onEdgeUpdateStart: () => {
        get().edgeUpdateSuccessful = false;
    },
    onEdgeUpdate: (oldEdge, newConnection) => {
        get().edgeUpdateSuccessful = true;
        set({
            edges: updateEdge(oldEdge, newConnection, get().edges),
        });
    },
    onEdgeUpdateEnd: (_, edge) => {
        if (!get().edgeUpdateSuccessful) {
            set({
                edges: get().edges.filter((e) => e.id !== edge.id),
            });
        }

        get().edgeUpdateSuccessful = true;
    },
    onDragOver: (event) => {
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
    },
    onDrop: (event) => {
        event.preventDefault();
        const reactFlowBounds = get().reactFlowWrapper.current?.getBoundingClientRect();

        const id = get().nodes[get().nodes.length - 1].id.replace(/\d+$/, (number) => (parseInt(number) + 1).toString());
        const type = event.dataTransfer?.getData('application/reactflow');

        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = get().reactFlowInstance?.project({
            x: event.clientX - reactFlowBounds!.left,
            y: event.clientY - reactFlowBounds!.top,
        });

        const newNode = {
            id,
            type,
            position: position ?? { x: 0, y: 0 },
            data: {}
        };

        set({
            nodes: get().nodes.concat(newNode),
        });
    }
}));

export default useStore;
