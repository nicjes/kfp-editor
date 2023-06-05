import { saveAs } from 'file-saver';

import { ReactFlowInstance } from 'reactflow';


function PipelineSaver({ reactFlowInstance }: { reactFlowInstance: ReactFlowInstance }) {

    const onSavePipeline = () => {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem("pipeline", JSON.stringify(flow));

        //TODO: implement saveAs
    };

    return (
        <button className='panel-button' onClick={onSavePipeline}>Save</button>
    );
};

export default PipelineSaver;