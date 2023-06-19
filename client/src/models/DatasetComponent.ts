import Component from "./Component";

class DatasetComponent extends Component {
    constructor(name: string, private file: string) {
        super(name);
    }

    get File(): string {
        return this.file;
    }

    set File(file: string) {
        this.file = file;
    }
}

export default DatasetComponent;