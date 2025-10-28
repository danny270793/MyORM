import Database from 'better-sqlite3';
import { PreparedStatement, Query } from './basics/query';

export class DatabaseManager {
    private static instance: DatabaseManager;
    private readonly db: Database.Database;

    private constructor() {
        this.db = new Database(':memory:', { verbose: console.log });
    }

    static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    static fetch(query: Query): number | bigint {
        const statement: PreparedStatement = query.toPreparedStatement();

        const instance: DatabaseManager = DatabaseManager.getInstance();
        const stmt = instance.db.prepare(statement.sql);
        const result = stmt.run(...statement.params);

        return result.lastInsertRowid;
    }

    static queryOne(query: Query): any {
        const statement: PreparedStatement = query.toPreparedStatement();
        const instance: DatabaseManager = DatabaseManager.getInstance();
        const stmt = instance.db.prepare(statement.sql);
        return stmt.get(...statement.params);
    }

    static queryAll(query: Query): any[] {
        const statement: PreparedStatement = query.toPreparedStatement();
        const instance: DatabaseManager = DatabaseManager.getInstance();
        const stmt = instance.db.prepare(statement.sql);
        return stmt.all(...statement.params);
    }

    static execute(query: Query): void {
        const statement: PreparedStatement = query.toPreparedStatement();
        const instance: DatabaseManager = DatabaseManager.getInstance();
        const stmt = instance.db.prepare(statement.sql);
        stmt.run(...statement.params);
    }

    getConnection(): Database.Database {
        return this.db;
    }

    close(): void {
        this.db.close();
    }
}
