import { DatabaseManager } from "./database";
import { TableBuilder } from "./migrations/tableBuilder";

export class Schema {
    private readonly db: DatabaseManager;
    
    constructor() {
        this.db = DatabaseManager.getInstance();
        this.initMigrationsTable();
    }
    
    private initMigrationsTable(): void {
        const sql = `CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            migration_number INTEGER UNIQUE NOT NULL,
            migration_name TEXT NOT NULL,
            applied_at TEXT NOT NULL
        )`;
        this.db.getConnection().prepare(sql).run();
    }
    
    createTable(tableName: string, callback: (table: TableBuilder) => void): void {
        const tableBuilder = new TableBuilder(tableName);
        callback(tableBuilder);
        
        const sql = tableBuilder.toSQL();
        this.db.getConnection().prepare(sql).run();
    }

    dropTable(tableName: string): void {
        const sql = `DROP TABLE IF EXISTS ${tableName}`;
        this.db.getConnection().prepare(sql).run();
    }
    
    isMigrationApplied(migrationNumber: number): boolean {
        const sql = `SELECT COUNT(*) as count FROM migrations WHERE migration_number = ?`;
        const result = this.db.getConnection().prepare(sql).get(migrationNumber) as { count: number };
        return result.count > 0;
    }
    
    recordMigration(migrationNumber: number, migrationName: string): void {
        const sql = `INSERT INTO migrations (migration_number, migration_name, applied_at) VALUES (?, ?, ?)`;
        this.db.getConnection().prepare(sql).run(migrationNumber, migrationName, new Date().toISOString());
    }
    
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

