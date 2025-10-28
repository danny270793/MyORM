import { Schema } from '../schema';

/**
 * Abstract base class for database migrations.
 * Migrations provide a way to version control database schema changes.
 *
 * @example
 * ```typescript
 * class CreateUsersTable extends Migration {
 *     getMigrationNumber(): number {
 *         return 1;
 *     }
 *
 *     up(schema: Schema): void {
 *         schema.createTable('users', (table) => {
 *             table.column('id', 'number').primaryKey().autoIncrement();
 *             table.column('name', 'string').notNull();
 *             table.column('email', 'string').unique();
 *         });
 *     }
 *
 *     down(schema: Schema): void {
 *         schema.dropTable('users');
 *     }
 * }
 * ```
 */
export abstract class Migration {
    /**
     * Gets the unique migration number used for ordering.
     * Migrations are applied in ascending order by this number.
     *
     * @returns The migration number
     */
    abstract getMigrationNumber(): number;

    /**
     * Applies the migration (creates tables, columns, etc.).
     *
     * @param schema - The Schema instance to use for database operations
     */
    abstract up(schema: Schema): void;

    /**
     * Reverts the migration (drops tables, columns, etc.).
     *
     * @param schema - The Schema instance to use for database operations
     */
    abstract down(schema: Schema): void;

    /**
     * Checks if this migration has already been applied.
     *
     * @param schema - The Schema instance to check against
     * @returns A promise resolving to true if the migration was applied, false otherwise
     */
    async wasApplied(schema: Schema): Promise<boolean> {
        return schema.isMigrationApplied(this.getMigrationNumber());
    }

    /**
     * Applies the migration and records it in the migrations table.
     *
     * @param schema - The Schema instance to use
     * @returns A promise that resolves when the migration is complete
     */
    async apply(schema: Schema): Promise<void> {
        this.up(schema);
        schema.recordMigration(
            this.getMigrationNumber(),
            this.constructor.name,
        );
    }
}

