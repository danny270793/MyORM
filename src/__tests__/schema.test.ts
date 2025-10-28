import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Schema } from "../libraries/schema";
import { DatabaseManager } from "../libraries/database";
import { TableBuilder } from "../libraries/migrations/tableBuilder";

describe("Schema", () => {
    let schema: Schema;

    beforeEach(() => {
        schema = new Schema();
    });

    afterEach(() => {
        // Clean up test tables
        const db = DatabaseManager.getInstance();
        db.getConnection().prepare("DROP TABLE IF EXISTS test_table").run();
        db.getConnection()
            .prepare("DROP TABLE IF EXISTS another_table")
            .run();
    });

    describe("constructor", () => {
        it("should create migrations table on initialization", () => {
            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='migrations'",
                )
                .get();

            expect(result).toBeDefined();
        });
    });

    describe("createTable", () => {
        it("should create a table with callback", () => {
            schema.createTable("test_table", (table: TableBuilder) => {
                table.column("id", "number").primaryKey();
                table.column("name", "string");
            });

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='test_table'",
                )
                .get();

            expect(result).toBeDefined();
        });

        it("should create table with multiple columns", () => {
            schema.createTable("test_table", (table: TableBuilder) => {
                table.column("id", "number").primaryKey().autoIncrement();
                table.column("name", "string").notNull();
                table.column("email", "string").unique();
                table.column("active", "boolean").default(true);
            });

            const db = DatabaseManager.getInstance();
            const tableInfo = db
                .getConnection()
                .prepare("PRAGMA table_info(test_table)")
                .all();

            expect(tableInfo).toHaveLength(4);
        });

        it("should not fail if table already exists", () => {
            schema.createTable("test_table", (table: TableBuilder) => {
                table.column("id", "number").primaryKey();
            });

            // Create again - should not throw
            expect(() => {
                schema.createTable("test_table", (table: TableBuilder) => {
                    table.column("id", "number").primaryKey();
                });
            }).not.toThrow();
        });
    });

    describe("dropTable", () => {
        beforeEach(() => {
            schema.createTable("test_table", (table: TableBuilder) => {
                table.column("id", "number").primaryKey();
            });
        });

        it("should drop an existing table", () => {
            schema.dropTable("test_table");

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='test_table'",
                )
                .get();

            expect(result).toBeUndefined();
        });

        it("should not fail when dropping non-existent table", () => {
            expect(() => {
                schema.dropTable("non_existent_table");
            }).not.toThrow();
        });

        it("should drop multiple tables", () => {
            schema.createTable("another_table", (table: TableBuilder) => {
                table.column("id", "number").primaryKey();
            });

            schema.dropTable("test_table");
            schema.dropTable("another_table");

            const db = DatabaseManager.getInstance();
            const tables = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('test_table', 'another_table')",
                )
                .all();

            expect(tables).toHaveLength(0);
        });
    });

    describe("isMigrationApplied", () => {
        it("should return false for unapplied migration", () => {
            const result = schema.isMigrationApplied(9001);

            expect(result).toBe(false);
        });

        it("should return true for applied migration", () => {
            schema.recordMigration(9002, "TestMigration");

            const result = schema.isMigrationApplied(9002);

            expect(result).toBe(true);
        });

        it("should handle multiple migrations", () => {
            schema.recordMigration(9003, "Migration1");
            schema.recordMigration(9004, "Migration2");

            expect(schema.isMigrationApplied(9003)).toBe(true);
            expect(schema.isMigrationApplied(9004)).toBe(true);
            expect(schema.isMigrationApplied(9005)).toBe(false);
        });
    });

    describe("recordMigration", () => {
        it("should record a migration", () => {
            schema.recordMigration(9010, "TestMigration");

            expect(schema.isMigrationApplied(9010)).toBe(true);
        });

        it("should record migration with timestamp", () => {
            schema.recordMigration(9011, "TestMigration");

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT applied_at FROM migrations WHERE migration_number = ?",
                )
                .get(9011) as { applied_at: string } | undefined;

            expect(result).toBeDefined();
            expect(result?.applied_at).toBeDefined();
            expect(new Date(result!.applied_at).getTime()).toBeLessThanOrEqual(
                Date.now(),
            );
        });

        it("should record migration name", () => {
            schema.recordMigration(9012, "CreateUsersTable");

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT migration_name FROM migrations WHERE migration_number = ?",
                )
                .get(9012) as { migration_name: string } | undefined;

            expect(result?.migration_name).toBe("CreateUsersTable");
        });

        it("should record multiple migrations", () => {
            schema.recordMigration(9013, "Migration1");
            schema.recordMigration(9014, "Migration2");
            schema.recordMigration(9015, "Migration3");

            const db = DatabaseManager.getInstance();
            const count = db
                .getConnection()
                .prepare("SELECT COUNT(*) as count FROM migrations")
                .get() as { count: number };

            expect(count.count).toBeGreaterThanOrEqual(3);
        });
    });

    describe("static methods", () => {
        afterEach(() => {
            const db = DatabaseManager.getInstance();
            db.getConnection()
                .prepare("DROP TABLE IF EXISTS static_test")
                .run();
        });

        it("should create table using static method", () => {
            Schema.createTable("static_test", {
                id: "INTEGER PRIMARY KEY",
                name: "TEXT",
            });

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='static_test'",
                )
                .get();

            expect(result).toBeDefined();
        });

        it("should drop table using static method", () => {
            Schema.createTable("static_test", {
                id: "INTEGER PRIMARY KEY",
            });

            Schema.dropTable("static_test");

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='static_test'",
                )
                .get();

            expect(result).toBeUndefined();
        });
    });
});

