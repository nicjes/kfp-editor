import { saveAs } from 'file-saver';

import useStore from './state-store';

function PipelineExporter() {
    const reactFlowInstance = useStore((state) => state.reactFlowInstance);

    const onExportPipeline = () => {
        //TODO: Post saved json object to server instead getting generic yaml

        //const pipeline = reactFlowInstance.toObject();
        //localStorage.setItem("test", JSON.stringify(pipeline));


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
        <button className='panel-button' title='Export current Pipeline as Kubeflow YAML' onClick={onExportPipeline}>Export Pipeline</button>
    );
};

export default PipelineExporter;