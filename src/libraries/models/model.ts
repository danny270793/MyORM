import { Column } from "./column";
import Insert from "../basics/insert";
import DatabaseManager from "../database";

export abstract class Model {
    protected static getTableName(): string {
        // Convert class name to snake_case table name
        // e.g., User -> user, UserProfile -> user_profile
        return this.name
            .replaceAll(/([A-Z])/g, (match, p1, offset) => 
                offset > 0 ? `_${p1.toLowerCase()}` : p1.toLowerCase()
            )
            .toLowerCase();
    }

    static async create<T extends Model>(this: new () => T, data: Record<string, any>): Promise<T> {
        const instance = new this();
        const tableName = (this as any).getTableName();
        
        // Set column values in the instance
        for (const key in data) {
            if ((instance as any)[key] instanceof Column) {
                (instance as any)[key].set(data[key]);
            }
        }
        
        // Prepare data for insertion
        const insertData: Record<string, any> = {};
        for (const key in instance) {
            if ((instance as any)[key] instanceof Column) {
                const column = (instance as any)[key] as Column;
                insertData[column.getName()] = column.get();
            }
        }
        
        // Create INSERT statement and execute
        const insertQuery = Insert.into(tableName).rows(insertData);
        const statement = insertQuery.toSQL();
        
        const db = DatabaseManager.getInstance();
        const result = db.execute(statement);
        
        // If no ID was provided, use the lastInsertRowid from the database
        if (!data.id && result.lastInsertRowid) {
            const idColumn = (instance as any).id;
            if (idColumn instanceof Column) {
                idColumn.set(String(result.lastInsertRowid));
            }
        }
        
        return instance;
    }
    
    static async find<T extends Model>(this: new () => T, id: string): Promise<T> {
        // TODO: Get data from database
        const data: Record<string, any> = { id };
        
        const instance = new this();
        
        for (const key in data) {
            if ((instance as any)[key] instanceof Column) {
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
