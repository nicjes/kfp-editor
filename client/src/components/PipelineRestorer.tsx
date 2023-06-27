import { Dispatch, SetStateAction } from 'react';

import { Edge, Node } from 'reactflow';

function PipelineRestorer({ setNodes, setEdges }: { setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>, setEdges: Dispatch<SetStateAction<Edge<any>[]>> }) {

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
        <span>
            <label className='panel-button' htmlFor='restore' title='Restore a Pipeline from JSON'>Restore</label>
            <input id='restore' type='file' accept='.json' onChange={onRestorePipeline} hidden />
        </span>
    );
};

export default PipelineRestorer;