import { FiltrableQuery, PreparedStatement } from './query';

export class Update extends FiltrableQuery {
    private rows: Record<string, any> = {};

    static table(tableName: string): Update {
        return new Update(tableName);
    }

    set(rows: Record<string, any>): this {
        this.rows = { ...this.rows, ...rows };
        return this;
    }

    toPreparedStatement(): PreparedStatement {
        const keys = Object.keys(this.rows);
        if (keys.length === 0) {
            throw new Error('No data provided for UPDATE');
        }

        // Reset params for fresh query generation
        this.params = [];

        let sql = `UPDATE ${this.tableName} SET `;

        const setClauses = keys.map((key) => {
            const placeholder = this.addParam(this.rows[key]);
            return `${key} = ${placeholder}`;
        });

        sql += setClauses.join(', ');
        sql += this.buildWhereClause();

        return { sql, params: this.params };
    }
}
