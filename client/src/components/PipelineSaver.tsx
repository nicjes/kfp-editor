import { saveAs } from 'file-saver';

import { ReactFlowInstance } from 'reactflow';


function PipelineSaver({ reactFlowInstance }: { reactFlowInstance: ReactFlowInstance }) {

    const onSavePipeline = () => {
        const flow = reactFlowInstance.toObject();
        const file = new Blob([JSON.stringify(flow)], { type: 'application/json' });
        saveAs(file, 'pipeline.json');
    };

    return (
        <button className='panel-button' title='Download current Pipeline as JSON' onClick={onSavePipeline}>Save</button>
    );
};

export default PipelineSaver;