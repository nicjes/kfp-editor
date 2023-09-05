import ReactFlow, {
    Controls,
    ReactFlowProvider,
    Panel,
    ConnectionLineType,
} from 'reactflow';
import Sidebar from './Sidebar';
import PipelineExporter from './PipelineExporter';
import PipelineLoader from './PipelineLoader';

import { shallow } from 'zustand/shallow';

import 'reactflow/dist/base.css';
import './Editor.css';

import useStore, { RFState } from './state-store';

// Selector function to extract specific state properties from the store.
const selector = (state: RFState) => ({
    reactFlowWrapper: state.reactFlowWrapper,
    nodeTypes: state.nodeTypes,
    nodes: state.nodes,
    edges: state.edges,
    onInit: state.onInit,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onEdgeUpdate: state.onEdgeUpdate,
    onEdgeUpdateStart: state.onEdgeUpdateStart,
    onEdgeUpdateEnd: state.onEdgeUpdateEnd,
    onDragOver: state.onDragOver,
    onDrop: state.onDrop,
});

/**
 * The main Editor component of the React Flow application.
 * Renders the React Flow canvas and controls, as well as the sidebar for adding nodes.
 */
function Editor() {
    // Use the selector function to extract state properties and initialize them.
    const {
        reactFlowWrapper,
        nodeTypes,
        nodes,
        edges,
        onInit,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onEdgeUpdate,
        onEdgeUpdateStart,
        onEdgeUpdateEnd,
        onDragOver,
        onDrop
    } = useStore(selector, shallow);

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
                        onInit={onInit}
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
                            <PipelineExporter />
                        </Panel>
                        <Panel position="top-right">
                            <PipelineLoader />
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
