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
}

export abstract class Model {
    static async create<T extends Model>(this: new () => T, data: Record<string, any>): Promise<T> {
        const instance = new this();
        
        for (const key in data) {
            if ((instance as any)[key] instanceof Column) {
                (instance as any)[key].set(data[key]);
            }
        }
        
        return instance;
    }

    static async find<T extends Model>(this: new () => T, id: string): Promise<T> {
        // TODO: Get data from database
        const data: Record<string, any> = { id };
        
        const instance = new this();
        
        for (const key in data) {
            if (key !== 'id' && (instance as any)[key] instanceof Column) {
                (instance as any)[key].set(data[key]);
            }
        }
        
        return instance;
    }

    static async findAll<T extends Model>(this: new () => T): Promise<T[]> {
        // TODO: Get data from database
        const rows: Record<string, any>[] = [];
        
        const instances: T[] = [];
        for (const row of rows) {
            const instance = new this();
            
            for (const key in row) {
                if (key !== 'id' && (instance as any)[key] instanceof Column) {
                    (instance as any)[key].set(row[key]);
                }
            }
            
            instances.push(instance);
        }
        
        return instances;
    }

    abstract getId(): string;
    
    async save(): Promise<void> {
        if (this.getId()) {
            // TODO: Update data to database
        } else {
            // TODO: Create data in database
        }
    }

    async delete(): Promise<void> {
        if (!this.getId()) {
            throw new Error("Model not saved in database yet");
        }
        // TODO: Delete data from database
    }
    
    private toData(): Record<string, any> {
        const data: Record<string, any> = { id: this.getId() };
        
        for (const key in this) {
            if ((this as any)[key] instanceof Column) {
                data[key] = (this as any)[key].get();
            }
        }
        
        return data;
    }
}
