/**
 * Represents a WHERE clause condition in a SQL query.
 */
export interface WhereCondition {
    /** The field/column name */
    field: string;
    /** The comparison operator (=, <, >, LIKE, etc.) */
    operator: string;
    /** The value to compare against */
    value: any;
    /** The separator to use before this condition (AND or OR) */
    separator?: 'and' | 'or';
}

/**
 * Represents a prepared SQL statement with parameterized queries.
 */
export interface PreparedStatement {
    /** The SQL query string with ? placeholders */
    sql: string;
    /** The parameter values to bind to the placeholders */
    params: any[];
}

/**
 * Abstract base class for all query builders.
 */
export abstract class Query {
    protected tableName: string = '';

    constructor(tableName?: string) {
        if (tableName) {
            this.tableName = tableName;
        }
    }

    /**
     * Converts the query to a prepared statement with SQL and parameters.
     * @returns The prepared statement
     */
    abstract toPreparedStatement(): PreparedStatement;
}

/**
 * Abstract base class for queries that support WHERE clauses.
 */
export abstract class FiltrableQuery extends Query {
    protected whereClauses: WhereCondition[] = [];
    protected params: any[] = [];

    /**
     * Adds WHERE conditions to the query.
     * @param conditions - One or more where conditions
     * @returns This query builder for chaining
     */
    where(...conditions: WhereCondition[]): this {
        this.whereClauses.push(...conditions);
        return this;
    }

    /**
     * Adds a parameter value and returns the placeholder.
     * Converts TypeScript types to SQLite-compatible values.
     * @param value - The parameter value
     * @returns The SQL placeholder ('?' or 'NULL')
     * @internal
     */
    protected addParam(value: any): string {
        if (value === undefined || value === null) {
            return 'NULL';
        }

        // Convert values for SQLite compatibility
        let paramValue: any;
        if (value instanceof Date) {
            paramValue = value.toISOString();
        } else if (typeof value === 'boolean') {
            paramValue = value ? 1 : 0;
        } else {
            paramValue = value;
        }

        this.params.push(paramValue);
        return '?';
    }

    /**
     * Builds the WHERE clause SQL from the conditions.
     * @returns The WHERE clause string
     * @internal
     */
    protected buildWhereClause(): string {
        if (this.whereClauses.length === 0) {
            return '';
        }

        const conditions = this.whereClauses.map((clause, index) => {
            const placeholder = this.addParam(clause.value);
            const condition = `${clause.field} ${clause.operator} ${placeholder}`;
            if (index === 0) {
                return condition;
            }
            const separator = clause.separator?.toUpperCase() || 'AND';
            return `${separator} ${condition}`;
        });

        return ` WHERE ${conditions.join(' ')}`;
    }
}
