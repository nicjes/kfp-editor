import './PipelineExporter.css';

function PipelineExporter() {
    const onExportPipeline = () => {
        console.log('Exporting Pipeline');
        //TODO
    };

    return (
        <button onClick={onExportPipeline}>Export Pipeline</button>
    );
};

export default PipelineExporter;