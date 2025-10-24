import { FiltrableQuery, PreparedStatement } from "./query";

export default class Insert extends FiltrableQuery {
    private readonly dataRows: Array<Record<string, any>> = [];

    static into(tableName: string): Insert {
        return new Insert(tableName);
    }

    rows(...rows: Array<Record<string, any>>): this {
        this.dataRows.push(...rows);
        return this;
    }

    toPreparedStatement(): PreparedStatement {
        if (this.dataRows.length === 0) {
            throw new Error("No data provided for INSERT");
        }

        // Reset params for fresh query generation
        this.params = [];

        // Get all unique column names from all rows
        const columns = Array.from(
            new Set(
                this.dataRows.flatMap(row => Object.keys(row))
            )
        );

        let sql = `INSERT INTO ${this.tableName} (${columns.join(", ")})`;

        // Build VALUES clause with placeholders
        const valueRows = this.dataRows.map(row => {
            const placeholders = columns.map(col => {
                const value = row[col];
                return this.addParam(value);
            });
            return `(${placeholders.join(", ")})`;
        });

        sql += ` VALUES ${valueRows.join(", ")}`;

        return { sql, params: this.params };
    }
}