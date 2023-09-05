import { saveAs } from 'file-saver';

import './PipelineLoader.css';

import useStore from './state-store';

/**
 * Component for loading and saving pipelines in JSON format.
 */
function PipelineLoader() {
    const [setNodes, setEdges] = useStore((state) => [state.setNodes, state.setEdges]);

    const reactFlowInstance = useStore((state) => state.reactFlowInstance);

    /**
     * Handles the saving of the current pipeline as a JSON file.
     */
    const onSavePipeline = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            const file = new Blob([JSON.stringify(flow)], { type: 'application/json' });
            saveAs(file, 'pipeline.json');
        }
    };

    /**
     * Handles the restoration of a pipeline from a JSON file.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the file input.
     */
    const onRestorePipeline = (event: React.ChangeEvent<HTMLInputElement>) => {
        const upload = event.target?.files?.[0];
        if (upload) {
            const fileReader = new FileReader();
            fileReader.readAsText(upload);
            fileReader.onload = (event) => {
                const file = event.target!.result;
                if (file && typeof file === 'string') {
                    try {
                        const json = JSON.parse(file);
                        if (json) {
                            setNodes(json.nodes);
                            setEdges(json.edges);
                        }
                    } catch (error) {
                        alert(error);
                    }
                }
            };
        }
    };

    return (
        <div className='pipeline-loader'>
            <button className='icon-button' title='Download current Pipeline as JSON' onClick={onSavePipeline}>
                <svg width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <g id="icon-download">
                        <path d="M512 666.5L367.2 521.7l36.2-36.2 83 83V256h51.2v312.5l83-83 36.2 36.2L512 666.5zm-204.8 50.3V768h409.6v-51.2H307.2z"></path>
                    </g>
                </svg>
            </button>
            <span>
                <label className='icon-button' htmlFor='restore' title='Restore a Pipeline from JSON'>
                    <svg width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <g id="icon-upload">
                            <path d="M512 256l144.8 144.8-36.2 36.2-83-83v311.6h-51.2V354l-83 83-36.2-36.2L512 256zM307.2 716.8V768h409.6v-51.2H307.2z"></path>
                        </g>
                    </svg>
                </label>
                <input id='restore' type='file' accept='.json' onChange={onRestorePipeline} hidden />
            </span>
        </div>
    );
};

export default PipelineLoader;
