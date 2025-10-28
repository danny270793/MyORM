import { DatabaseManager } from './database';
import { TableBuilder } from './migrations/tableBuilder';

/**
 * Manages database schema operations including table creation/deletion and migration tracking.
 *
 * @example
 * ```typescript
 * const schema = new Schema();
 *
 * // Create a table
 * schema.createTable('users', (table) => {
 *     table.column('id', 'number').primaryKey().autoIncrement();
 *     table.column('name', 'string').notNull();
 * });
 *
 * // Drop a table
 * schema.dropTable('users');
 *
 * // Check if migration was applied
 * const applied = schema.isMigrationApplied(1);
 * ```
 */
export class Schema {
    private readonly db: DatabaseManager;

    /**
     * Creates a new Schema instance and initializes the migrations tracking table.
     */
    constructor() {
        this.db = DatabaseManager.getInstance();
        this.initMigrationsTable();
    }

    /**
     * Initializes the migrations tracking table if it doesn't exist.
     * @internal
     */
    private initMigrationsTable(): void {
        const sql = `CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            migration_number INTEGER UNIQUE NOT NULL,
            migration_name TEXT NOT NULL,
            applied_at TEXT NOT NULL
        )`;
        this.db.getConnection().prepare(sql).run();
    }

    /**
     * Creates a new table in the database using a fluent builder API.
     *
     * @param tableName - The name of the table to create
     * @param callback - Function that receives a TableBuilder to define the table structure
     *
     * @example
     * ```typescript
     * schema.createTable('users', (table) => {
     *     table.column('id', 'number').primaryKey().autoIncrement();
     *     table.column('name', 'string').notNull();
     *     table.column('email', 'string').unique();
     * });
     * ```
     */
    createTable(
        tableName: string,
        callback: (table: TableBuilder) => void,
    ): void {
        const tableBuilder = new TableBuilder(tableName);
        callback(tableBuilder);

        const sql = tableBuilder.toSQL();
        this.db.getConnection().prepare(sql).run();
    }

    /**
     * Drops a table from the database.
     *
     * @param tableName - The name of the table to drop
     *
     * @example
     * ```typescript
     * schema.dropTable('users');
     * ```
     */
    dropTable(tableName: string): void {
        const sql = `DROP TABLE IF EXISTS ${tableName}`;
        this.db.getConnection().prepare(sql).run();
    }

    /**
     * Checks if a migration has been applied.
     *
     * @param migrationNumber - The migration number to check
     * @returns true if the migration was applied, false otherwise
     */
    isMigrationApplied(migrationNumber: number): boolean {
        const sql = `SELECT COUNT(*) as count FROM migrations WHERE migration_number = ?`;
        const result = this.db
            .getConnection()
            .prepare(sql)
            .get(migrationNumber) as { count: number };
        return result.count > 0;
    }

    /**
     * Records a migration as applied in the migrations table.
     *
     * @param migrationNumber - The migration number
     * @param migrationName - The migration class name
     */
    recordMigration(migrationNumber: number, migrationName: string): void {
        const sql = `INSERT INTO migrations (migration_number, migration_name, applied_at) VALUES (?, ?, ?)`;
        this.db
            .getConnection()
            .prepare(sql)
            .run(migrationNumber, migrationName, new Date().toISOString());
    }

    /**
     * Creates a table using raw column definitions (legacy method).
     *
     * @param tableName - The name of the table to create
     * @param columns - Object mapping column names to SQL type definitions
     * @deprecated Use the callback-based createTable method instead
     * @internal
     */
    static createTable(tableName: string, columns: Record<string, string>): void {
        const db = DatabaseManager.getInstance();
        const columnDefs = Object.entries(columns)
            .map(([name, type]) => `${name} ${type}`)
            .join(', ');

        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefs})`;
        db.getConnection().prepare(sql).run();
    }

    /**
     * Drops a table (static method).
     *
     * @param tableName - The name of the table to drop
     * @deprecated Use the instance method dropTable instead
     * @internal
     */
    static dropTable(tableName: string): void {
        const db = DatabaseManager.getInstance();
        const sql = `DROP TABLE IF EXISTS ${tableName}`;
        db.getConnection().prepare(sql).run();
    }
}

