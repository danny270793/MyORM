import { Column } from "./column";
import Insert from "../basics/insert";
import Select from "../basics/select";
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
    
    private static convertFromSQLite(value: any, type: string): any {
        if (value === null || value === undefined) {
            return value;
        }
        
        // Convert SQLite values back to their original types
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
        const tableName = (this as any).getTableName();
        
        // Create SELECT query with WHERE clause
        const selectQuery = Select.from(tableName).where({
            field: "id",
            operator: "=",
            value: id
        });
        const statement = selectQuery.toSQL();
        
        // Execute query
        const db = DatabaseManager.getInstance();
        const row = db.queryOne(statement);
        
        // Check if record exists
        if (!row) {
            throw new Error(`${this.name} with id ${id} not found`);
        }
        
        // Create instance and populate columns
        const instance = new this();
        
        for (const key in instance) {
            if ((instance as any)[key] instanceof Column) {
                const column = (instance as any)[key] as Column;
                const columnName = column.getName();
                const columnType = column.getType();
                
                if (row[columnName] !== undefined) {
                    const convertedValue = (this as any).convertFromSQLite(row[columnName], columnType);
                    column.set(convertedValue);
                }
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
