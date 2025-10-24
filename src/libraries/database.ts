import Database from "better-sqlite3";
import { PreparedStatement } from "./basics/query";

class DatabaseManager {
    private static instance: DatabaseManager;
    private readonly db: Database.Database;

    private constructor() {
        // Initialize with an in-memory database or file-based
        this.db = new Database(":memory:", { verbose: console.log });
    }

    static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    getConnection(): Database.Database {
        return this.db;
    }

    execute(statement: PreparedStatement): Database.RunResult {
        const stmt = this.db.prepare(statement.sql);
        return stmt.run(...statement.params);
    }

    query(statement: PreparedStatement): any[] {
        const stmt = this.db.prepare(statement.sql);
        return stmt.all(...statement.params);
    }

    queryOne(statement: PreparedStatement): any {
        const stmt = this.db.prepare(statement.sql);
        return stmt.get(...statement.params);
    }

    close(): void {
        this.db.close();
    }
}

export default DatabaseManager;

