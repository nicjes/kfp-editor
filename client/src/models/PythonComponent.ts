import Component from "./Component";

class PythonComponent extends Component {
    constructor(name: string, private code: string) {
        super(name);
    }

    get Code(): string {
        return this.code;
    }

    set Code(code: string) {
        this.code = code;
    }
}

export default PythonComponent;