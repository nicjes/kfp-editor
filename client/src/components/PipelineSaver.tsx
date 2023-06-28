import { saveAs } from 'file-saver';

import useStore from './state-store';

function PipelineSaver() {
    const reactFlowInstance = useStore((state) => state.reactFlowInstance);

    const onSavePipeline = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            const file = new Blob([JSON.stringify(flow)], { type: 'application/json' });
            saveAs(file, 'pipeline.json');
        }
    };

    return (
        <button className='panel-button' title='Download current Pipeline as JSON' onClick={onSavePipeline}>Save</button>
    );
};

export default PipelineSaver;