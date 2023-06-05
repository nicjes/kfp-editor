import { saveAs } from 'file-saver';
import { Dispatch, SetStateAction } from 'react';

import { Edge, Node } from 'reactflow';

function PipelineRestorer({ setNodes, setEdges }: { setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>, setEdges: Dispatch<SetStateAction<Edge<any>[]>> }) {

    const onRestorePipeline = () => {
        const storageItem = localStorage.getItem('pipeline');
        const flow = storageItem ? JSON.parse(storageItem) : null;

        if (flow) {
            setNodes(flow.nodes);
            setEdges(flow.edges);
        }

        //TODO: implement file upload
    };

    return (
        <button className='panel-button' onClick={onRestorePipeline}>Restore</button>
    );
};

export default PipelineRestorer;