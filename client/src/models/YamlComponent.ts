import Component from "./Component";

class YamlComponent extends Component {
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

export default YamlComponent;