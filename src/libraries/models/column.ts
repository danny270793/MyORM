export class Column {
    private readonly name: string;
    private readonly type: string;
    private value: any;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    set(value: any): void {
        this.value = value;
    }

    get(): any {
        return this.value;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }
}
