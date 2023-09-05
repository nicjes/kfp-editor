import { saveAs } from 'file-saver';

import useStore from './state-store';

/**
 * Component for exporting the current pipeline as a Kubeflow YAML file.
 */
function PipelineExporter() {
    const reactFlowInstance = useStore((state) => state.reactFlowInstance);

    /**
     * Handles the export of the pipeline as a Kubeflow YAML file.
     */
    const onExportPipeline = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            const dto = JSON.stringify(flow);

            fetch('./api/kfp/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: dto
            })
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
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <button className='panel-button' title='Export current Pipeline as Kubeflow YAML' onClick={onExportPipeline}>Export Pipeline</button>
    );
};

export default PipelineExporter;
