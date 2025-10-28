import { FiltrableQuery, PreparedStatement } from "./query";

export class Select extends FiltrableQuery {
    static from(tableName: string): Select {
        return new Select(tableName);
    }

    private selectFields: string[] = [];
    private orderByClause?: { field: string; direction: string };
    private limitValue?: number;
    private offsetValue?: number;
    private groupByField?: string;
    private havingClause?: { field: string; operator: string; value: any };

    fields(...fields: string[]): this {
        this.selectFields = fields;
        return this;
    }

    orderBy(field: string, direction: string = "asc"): this {
        this.orderByClause = { field, direction };
        return this;
    }

    limit(value: number): this {
        this.limitValue = value;
        return this;
    }

    offset(value: number): this {
        this.offsetValue = value;
        return this;
    }

    groupBy(field: string): this {
        this.groupByField = field;
        return this;
    }

    having(field: string, operator: string, value: any): this {
        this.havingClause = { field, operator, value };
        return this;
    }

    toPreparedStatement(): PreparedStatement {
        // Reset params for fresh query generation
        this.params = [];

        let sql = "SELECT ";

        // Add fields
        if (this.selectFields.length > 0) {
            sql += this.selectFields.join(", ");
        } else {
            sql += "*";
        }

        // Add FROM clause
        sql += ` FROM ${this.tableName}`;

        // Add WHERE clause
        sql += this.buildWhereClause();

        // Add GROUP BY clause
        if (this.groupByField) {
            sql += ` GROUP BY ${this.groupByField}`;
        }

        // Add HAVING clause
        if (this.havingClause) {
            const placeholder = this.addParam(this.havingClause.value);
            sql += ` HAVING ${this.havingClause.field} ${this.havingClause.operator} ${placeholder}`;
        }

        // Add ORDER BY clause
        if (this.orderByClause) {
            sql += ` ORDER BY ${this.orderByClause.field} ${this.orderByClause.direction.toUpperCase()}`;
        }

        // Add LIMIT clause
        if (this.limitValue !== undefined) {
            sql += ` LIMIT ${this.limitValue}`;
        }

        // Add OFFSET clause
        if (this.offsetValue !== undefined) {
            sql += ` OFFSET ${this.offsetValue}`;
        }

        return { sql, params: this.params };
    }
}
