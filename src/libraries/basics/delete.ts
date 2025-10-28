import { FiltrableQuery, PreparedStatement } from './query';

export class Delete extends FiltrableQuery {
    static from(tableName: string): Delete {
        return new Delete(tableName);
    }

    toPreparedStatement(): PreparedStatement {
        // Reset params for fresh query generation
        this.params = [];

        let sql = `DELETE FROM ${this.tableName}`;
        sql += this.buildWhereClause();

        return { sql, params: this.params };
    }
}
