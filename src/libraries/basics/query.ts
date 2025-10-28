export interface WhereCondition {
    field: string;
    operator: string;
    value: any;
    separator?: 'and' | 'or';
}

export interface PreparedStatement {
    sql: string;
    params: any[];
}

export abstract class Query {
    protected tableName: string = '';

    constructor(tableName?: string) {
        if (tableName) {
            this.tableName = tableName;
        }
    }

    abstract toPreparedStatement(): PreparedStatement;
}

export abstract class FiltrableQuery extends Query {
    protected whereClauses: WhereCondition[] = [];
    protected params: any[] = [];

    where(...conditions: WhereCondition[]): this {
        this.whereClauses.push(...conditions);
        return this;
    }

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
