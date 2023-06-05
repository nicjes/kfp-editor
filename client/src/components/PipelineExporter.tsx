import { saveAs } from 'file-saver';

import './PipelineExporter.css';

function PipelineExporter() {
    const onExportPipeline = () => {
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
        <button onClick={onExportPipeline}>Export Pipeline</button>
    );
};

export default PipelineExporter;