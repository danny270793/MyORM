import { Column } from "./column";
import { Insert } from "../basics/insert";
import { Select } from "../basics/select";
import { Update } from "../basics/update";
import { Delete } from "../basics/delete";
import { DatabaseManager } from "../database";
import { Query } from "../basics/query";

export abstract class Model {
    protected static tableName?: string;
    
    protected static getTableName(): string {
        if (this.tableName) {
            return this.tableName;
        }
        return this.name
            .replaceAll(/([A-Z])/g, (match, p1, offset) => 
                offset > 0 ? `_${p1.toLowerCase()}` : p1.toLowerCase()
            )
            .toLowerCase();
    }
    
    private static convertFromSQLite(value: any, type: string): any {
        if (value === null || value === undefined) {
            return value;
        }
        
        switch (type) {
            case "boolean":
                return value === 1 || value === true;
            case "date":
                return typeof value === "string" ? new Date(value) : value;
            default:
                return value;
        }
    }

    static async create<T extends Model>(this: new () => T, data: Record<string, any>): Promise<T> {
        const instance: any = new this();
        for (const key in data) {
            if (instance[key] instanceof Column) {
                instance[key].set(data[key]);
            }
        }

        const tableName: string = (this as any).getTableName();
        const query: Query = Insert.into(tableName).rows(data);
        const lastInsertedId: number | bigint = DatabaseManager.fetch(query);

        if (!data.id && lastInsertedId) {
            instance.id.set(lastInsertedId);
        }
        
        return instance;
    }
    
    static async find<T extends Model>(this: new () => T, id: string): Promise<T> {
        const tableName: string = (this as any).getTableName();
        
        const query: Query = Select.from(tableName).where({
            field: "id",
            operator: "=",
            value: id
        });
        const row: any = DatabaseManager.queryOne(query);
        
        if (!row) {
            throw new Error(`${this.name} with id ${id} not found`);
        }
        
        const instance: any = new this();
        for (const key in instance) {
            if (instance[key] instanceof Column) {
                const column: Column = instance[key];
                const columnName: string = column.getName();
                const columnType: string = column.getType();
                
                if (row[columnName] !== undefined) {
                    const convertedValue: any = (this as any).convertFromSQLite(row[columnName], columnType);
                    column.set(convertedValue);
                }
            }
        }
        
        return instance;
    }

    static async findAll<T extends Model>(this: new () => T): Promise<T[]> {
        const tableName: string = (this as any).getTableName();
        
        const query: Query = Select.from(tableName);
        const rows: any[] = DatabaseManager.queryAll(query);
        
        const instances: T[] = [];
        for (const row of rows) {
            const instance: any = new this();
            
            for (const key in instance) {
                if (instance[key] instanceof Column) {
                    const column: Column = instance[key];
                    const columnName: string = column.getName();
                    const columnType: string = column.getType();
                    
                    if (row[columnName] !== undefined) {
                        const convertedValue: any = (this as any).convertFromSQLite(row[columnName], columnType);
                        column.set(convertedValue);
                    }
                }
            }
            
            instances.push(instance);
        }
        
        return instances;
    }

    abstract getId(): string | number;
    
    async save(): Promise<void> {
        const tableName: string = (this.constructor as any).getTableName();
        const id: string | number = this.getId();
        
        if (id) {
            // Update existing record
            const updateData: Record<string, any> = {};
            
            for (const key in this) {
                if ((this as any)[key] instanceof Column) {
                    const column: Column = (this as any)[key];
                    const columnName: string = column.getName();
                    
                    // Skip the id column in update
                    if (columnName !== 'id') {
                        updateData[columnName] = column.get();
                    }
                }
            }
            
            const query: Query = Update.table(tableName)
                .set(updateData)
                .where({
                    field: "id",
                    operator: "=",
                    value: id
                });
            
            DatabaseManager.execute(query);
        } else {
            // Create new record
            const insertData: Record<string, any> = {};
            
            for (const key in this) {
                if ((this as any)[key] instanceof Column) {
                    const column: Column = (this as any)[key];
                    const columnName: string = column.getName();
                    
                    // Skip the id column if it's not set
                    if (columnName !== 'id') {
                        insertData[columnName] = column.get();
                    }
                }
            }
            
            const query: Query = Insert.into(tableName).rows(insertData);
            const lastInsertedId: number | bigint = DatabaseManager.fetch(query);
            
            if (lastInsertedId && (this as any).id instanceof Column) {
                (this as any).id.set(lastInsertedId);
            }
        }
    }

    async delete(): Promise<void> {
        const id: string | number = this.getId();
        
        if (!id) {
            throw new Error("Model not saved in database yet");
        }
        
        const tableName: string = (this.constructor as any).getTableName();
        const query: Query = Delete.from(tableName).where({
            field: "id",
            operator: "=",
            value: id
        });
        
        DatabaseManager.execute(query);
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
