/**
 * Represents a database column with type information and value storage.
 * Used by Model instances to store and retrieve column values with type safety.
 *
 * @example
 * ```typescript
 * const nameColumn = new Column('name', 'string');
 * nameColumn.set('John Doe');
 * console.log(nameColumn.get()); // 'John Doe'
 * ```
 */
export class Column {
    private readonly name: string;
    private readonly type: string;
    private value: any;

    /**
     * Creates a new Column instance.
     *
     * @param name - The column name in the database
     * @param type - The column type ('string', 'number', 'boolean', 'date')
     */
    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    /**
     * Sets the column value.
     *
     * @param value - The value to store in this column
     */
    set(value: any): void {
        this.value = value;
    }

    /**
     * Gets the current column value.
     *
     * @returns The stored column value
     */
    get(): any {
        return this.value;
    }

    /**
     * Gets the column name.
     *
     * @returns The database column name
     */
    getName(): string {
        return this.name;
    }

    /**
     * Gets the column type.
     *
     * @returns The column type ('string', 'number', 'boolean', 'date')
     */
    getType(): string {
        return this.type;
    }
}
