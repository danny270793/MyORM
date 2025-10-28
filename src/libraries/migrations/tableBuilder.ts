export class TableBuilder {
    private readonly tableName: string;
    private readonly columns: ColumnDefinition[] = [];

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    column(name: string, type: string): ColumnBuilder {
        const columnBuilder = new ColumnBuilder(name, type);
        this.columns.push(columnBuilder.getDefinition());
        return columnBuilder;
    }

    getColumns(): ColumnDefinition[] {
        return this.columns;
    }

    getTableName(): string {
        return this.tableName;
    }

    toSQL(): string {
        const columnDefs = this.columns.map(col => {
            const parts: string[] = [`${col.name} ${this.mapTypeToSQL(col.type)}`];
            
            if (col.primaryKey) {
                parts.push("PRIMARY KEY");
            }
            
            if (col.autoIncrement) {
                parts.push("AUTOINCREMENT");
            }
            
            if (col.unique) {
                parts.push("UNIQUE");
            }
            
            if (col.notNull) {
                parts.push("NOT NULL");
            }
            
            if (col.nullable && !col.notNull && !col.primaryKey) {
                // NULL is default in SQLite, but we can be explicit
                parts.push("NULL");
            }
            
            if (col.defaultValue !== undefined) {
                parts.push(`DEFAULT ${this.formatDefaultValue(col.defaultValue)}`);
            }
            
            return parts.join(" ");
        });
        
        return `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columnDefs.join(", ")})`;
    }

    private mapTypeToSQL(type: string): string {
        switch (type) {
            case "number":
                return "INTEGER";
            case "string":
                return "TEXT";
            case "boolean":
                return "INTEGER"; // SQLite uses 0/1 for booleans
            case "date":
                return "TEXT"; // SQLite stores dates as TEXT or INTEGER
            default:
                return "TEXT";
        }
    }

    private formatDefaultValue(value: any): string {
        if (value === null) {
            return "NULL";
        }
        if (typeof value === "string") {
            return `'${value.replaceAll("'", "''")}'`;
        }
        if (typeof value === "boolean") {
            return value ? "1" : "0";
        }
        if (value instanceof Date) {
            return `'${value.toISOString()}'`;
        }
        return String(value);
    }
}

export interface ColumnDefinition {
    name: string;
    type: string;
    primaryKey?: boolean;
    autoIncrement?: boolean;
    unique?: boolean;
    notNull?: boolean;
    nullable?: boolean;
    defaultValue?: any;
}

export class ColumnBuilder {
    private readonly definition: ColumnDefinition;

    constructor(name: string, type: string) {
        this.definition = {
            name,
            type
        };
    }

    primaryKey(): this {
        this.definition.primaryKey = true;
        return this;
    }

    autoIncrement(): this {
        this.definition.autoIncrement = true;
        return this;
    }

    unique(): this {
        this.definition.unique = true;
        return this;
    }

    notNull(): this {
        this.definition.notNull = true;
        return this;
    }

    nullable(): this {
        this.definition.nullable = true;
        return this;
    }

    default(value: any): this {
        this.definition.defaultValue = value;
        return this;
    }

    getDefinition(): ColumnDefinition {
        return this.definition;
    }
}

