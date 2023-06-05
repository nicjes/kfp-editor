import { saveAs } from 'file-saver';

import { ReactFlowInstance } from 'reactflow';


function PipelineExporter({ reactFlowInstance }: { reactFlowInstance: ReactFlowInstance }) {

    const onExportPipeline = () => {

        //TODO: Post saved json object to server instead getting generic yaml

        const flow = reactFlowInstance.toObject();
        localStorage.setItem("test", JSON.stringify(flow));


        fetch('/api/kfp/compile')
            .then(async response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    return response.json().then(json => {
                        throw new Error(json.error);
                    });
                }
            })
            .then(blob => {
                saveAs(blob, 'pipeline.yaml');
            }).catch(error => {
                console.error(error);
            });
    };

    return (
        <button className='panel-button' onClick={onExportPipeline}>Export Pipeline</button>
    );
};

export default PipelineExporter;