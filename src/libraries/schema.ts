import DatabaseManager from "./database";

export class Schema {
    static createTable(tableName: string, columns: Record<string, string>): void {
        const db = DatabaseManager.getInstance();
        const columnDefs = Object.entries(columns)
            .map(([name, type]) => `${name} ${type}`)
            .join(", ");
        
        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefs})`;
        db.getConnection().prepare(sql).run();
    }

    static dropTable(tableName: string): void {
        const db = DatabaseManager.getInstance();
        const sql = `DROP TABLE IF EXISTS ${tableName}`;
        db.getConnection().prepare(sql).run();
    }
}

