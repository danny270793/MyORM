import { FiltrableQuery, PreparedStatement } from "./query";

export default class Delete extends FiltrableQuery {
    static from(tableName: string): Delete {
        return new Delete(tableName);
    }

    toSQL(): PreparedStatement {
        // Reset params for fresh query generation
        this.params = [];

        let sql = `DELETE FROM ${this.tableName}`;
        sql += this.buildWhereClause();
        
        return { sql, params: this.params };
    }
}