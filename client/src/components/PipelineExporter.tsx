import { saveAs } from 'file-saver';

import './PipelineExporter.css';

function PipelineExporter() {
    const onExportPipeline = () => {
        fetch('/api/kfp/compile')
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    return response.json().then(json => {
                        throw new Error(JSON.stringify(json));
                    });
                }
            })
            .then(blob => {
                saveAs(blob, 'pipeline.yaml');
            })
    };

    return (
        <button onClick={onExportPipeline}>Export Pipeline</button>
    );
};

export default PipelineExporter;