abstract class Component {
    constructor(private name: string) { }

    get Name(): string {
        return this.name;
    }

    set Name(name: string) {
        this.name = name;
    }
}

export default Component;