import Component from "./Component";

class ResourceComponent extends Component {
    constructor(name: string, private url: string) {
        super(name);
    }

    get Url(): string {
        return this.url;
    }

    set Url(url: string) {
        this.url = url;
    }
}

export default ResourceComponent;