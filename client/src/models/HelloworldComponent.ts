import Component from "./Component";

class HelloworldComponent extends Component {
    constructor(name: string, private text: string) {
        super(name);
    }

    get Text(): string {
        return this.text;
    }

    set Text(text: string) {
        this.text = text;
    }
}

export default HelloworldComponent;