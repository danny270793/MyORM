import { Column } from './column';
import { Insert } from '../basics/insert';
import { Select } from '../basics/select';
import { Update } from '../basics/update';
import { Delete } from '../basics/delete';
import { DatabaseManager } from '../database';
import { Query } from '../basics/query';

/**
 * Abstract base class for all database models following the Active Record pattern.
 * Provides CRUD operations and automatic table name generation.
 *
 * @example
 * ```typescript
 * class User extends Model {
 *     static readonly tableName = 'users';
 *
 *     getId(): string | number {
 *         return this.id.get();
 *     }
 *
 *     id: Column = new Column('id', 'number');
 *     name: Column = new Column('name', 'string');
 *     email: Column = new Column('email', 'string');
 * }
 *
 * // Create
 * const user = await User.create({ name: 'John', email: 'john@example.com' });
 *
 * // Read
 * const found = await User.find('1');
 * const all = await User.findAll();
 *
 * // Update
 * found.name.set('Jane');
 * await found.save();
 *
 * // Delete
 * await found.delete();
 * ```
 */
export abstract class Model {
    /**
     * Optional explicit table name. If not set, table name is derived from class name.
     */
    protected static tableName?: string;

    /**
     * Gets the table name for this model.
     * If tableName is set explicitly, returns that; otherwise generates from class name.
     *
     * @returns The table name
     * @internal
     */
    protected static getTableName(): string {
        if (this.tableName) {
            return this.tableName;
        }
        return this.name
            .replaceAll(/([A-Z])/g, (match, p1, offset) =>
                offset > 0 ? `_${p1.toLowerCase()}` : p1.toLowerCase(),
            )
            .toLowerCase();
    }

    /**
     * Converts SQLite values to TypeScript types.
     *
     * @param value - The value from SQLite
     * @param type - The target type ('string', 'number', 'boolean', 'date')
     * @returns The converted value
     * @internal
     */
    private static convertFromSQLite(value: any, type: string): any {
        if (value === null || value === undefined) {
            return value;
        }

        switch (type) {
            case 'boolean':
                return value === 1 || value === true;
            case 'date':
                return typeof value === 'string' ? new Date(value) : value;
            default:
                return value;
        }
    }

    /**
     * Creates a new record in the database and returns a model instance.
     *
     * @template T - The model type extending Model
     * @param data - Object containing column names and values
     * @returns A promise resolving to the created model instance
     *
     * @example
     * ```typescript
     * const user = await User.create({
     *     name: 'John Doe',
     *     email: 'john@example.com',
     *     active: true
     * });
     * ```
     */
    static async create<T extends Model>(
        this: new () => T,
        data: Record<string, any>,
    ): Promise<T> {
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

    /**
     * Finds a single record by its ID.
     *
     * @template T - The model type extending Model
     * @param id - The record ID to find
     * @returns A promise resolving to the found model instance
     * @throws {Error} If no record is found with the given ID
     *
     * @example
     * ```typescript
     * const user = await User.find('1');
     * console.log(user.name.get());
     * ```
     */
    static async find<T extends Model>(
        this: new () => T,
        id: string,
    ): Promise<T> {
        const tableName: string = (this as any).getTableName();

        const query: Query = Select.from(tableName).where({
            field: 'id',
            operator: '=',
            value: id,
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
                    const convertedValue: any = (this as any).convertFromSQLite(
                        row[columnName],
                        columnType,
                    );
                    column.set(convertedValue);
                }
            }
        }

        return instance;
    }

    /**
     * Finds all records in the table.
     *
     * @template T - The model type extending Model
     * @returns A promise resolving to an array of model instances
     *
     * @example
     * ```typescript
     * const users = await User.findAll();
     * users.forEach(user => console.log(user.name.get()));
     * ```
     */
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
                        const convertedValue: any = (
                            this as any
                        ).convertFromSQLite(row[columnName], columnType);
                        column.set(convertedValue);
                    }
                }
            }

            instances.push(instance);
        }

        return instances;
    }

    /**
     * Gets the ID of this model instance.
     * Must be implemented by subclasses.
     *
     * @returns The model ID
     */
    abstract getId(): string | number;

    /**
     * Saves the current model instance to the database.
     * If the model has an ID, updates the existing record; otherwise creates a new one.
     *
     * @returns A promise that resolves when the save is complete
     *
     * @example
     * ```typescript
     * const user = await User.find('1');
     * user.name.set('New Name');
     * await user.save();
     * ```
     */
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

            const query: Query = Update.table(tableName).set(updateData).where({
                field: 'id',
                operator: '=',
                value: id,
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
            const lastInsertedId: number | bigint =
                DatabaseManager.fetch(query);

            if (lastInsertedId && (this as any).id instanceof Column) {
                (this as any).id.set(lastInsertedId);
            }
        }
    }

    /**
     * Deletes this model instance from the database.
     *
     * @returns A promise that resolves when the deletion is complete
     * @throws {Error} If the model hasn't been saved to the database yet
     *
     * @example
     * ```typescript
     * const user = await User.find('1');
     * await user.delete();
     * ```
     */
    async delete(): Promise<void> {
        const id: string | number = this.getId();

        if (!id) {
            throw new Error('Model not saved in database yet');
        }

        const tableName: string = (this.constructor as any).getTableName();
        const query: Query = Delete.from(tableName).where({
            field: 'id',
            operator: '=',
            value: id,
        });

        DatabaseManager.execute(query);
    }

    /**
     * Converts the model instance to a plain object.
     *
     * @returns An object containing all column values
     * @internal
     */
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
