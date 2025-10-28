import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Migration } from "../libraries/migrations/migration";
import { Schema } from "../libraries/schema";
import { TableBuilder } from "../libraries/migrations/tableBuilder";
import { DatabaseManager } from "../libraries/database";

class TestMigration1 extends Migration {
    getMigrationNumber(): number {
        return 1;
    }

    up(schema: Schema): void {
        schema.createTable("migration_test", (table: TableBuilder) => {
            table.column("id", "number").primaryKey();
            table.column("name", "string");
        });
    }

    down(schema: Schema): void {
        schema.dropTable("migration_test");
    }
}

class TestMigration2 extends Migration {
    getMigrationNumber(): number {
        return 2;
    }

    up(schema: Schema): void {
        schema.createTable("migration_test2", (table: TableBuilder) => {
            table.column("id", "number").primaryKey();
        });
    }

    down(schema: Schema): void {
        schema.dropTable("migration_test2");
    }
}

describe("Migration", () => {
    let schema: Schema;

    beforeEach(() => {
        schema = new Schema();
    });

    afterEach(() => {
        // Clean up
        const db = DatabaseManager.getInstance();
        db.getConnection()
            .prepare("DROP TABLE IF EXISTS migration_test")
            .run();
        db.getConnection()
            .prepare("DROP TABLE IF EXISTS migration_test2")
            .run();
        db.getConnection()
            .prepare("DELETE FROM migrations WHERE migration_number IN (1, 2)")
            .run();
    });

    describe("getMigrationNumber", () => {
        it("should return the migration number", () => {
            const migration = new TestMigration1();

            expect(migration.getMigrationNumber()).toBe(1);
        });

        it("should return unique numbers for different migrations", () => {
            const migration1 = new TestMigration1();
            const migration2 = new TestMigration2();

            expect(migration1.getMigrationNumber()).not.toBe(
                migration2.getMigrationNumber(),
            );
        });
    });

    describe("up", () => {
        it("should execute the migration up method", () => {
            const migration = new TestMigration1();

            migration.up(schema);

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='migration_test'",
                )
                .get();

            expect(result).toBeDefined();
        });

        it("should create tables as defined", () => {
            const migration = new TestMigration1();

            migration.up(schema);

            const db = DatabaseManager.getInstance();
            const tableInfo = db
                .getConnection()
                .prepare("PRAGMA table_info(migration_test)")
                .all();

            expect(tableInfo).toHaveLength(2);
        });
    });

    describe("down", () => {
        it("should execute the migration down method", () => {
            const migration = new TestMigration1();

            migration.up(schema);
            migration.down(schema);

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='migration_test'",
                )
                .get();

            expect(result).toBeUndefined();
        });

        it("should revert changes made by up", () => {
            const migration = new TestMigration1();

            migration.up(schema);
            expect(
                DatabaseManager.getInstance()
                    .getConnection()
                    .prepare(
                        "SELECT name FROM sqlite_master WHERE type='table' AND name='migration_test'",
                    )
                    .get(),
            ).toBeDefined();

            migration.down(schema);
            expect(
                DatabaseManager.getInstance()
                    .getConnection()
                    .prepare(
                        "SELECT name FROM sqlite_master WHERE type='table' AND name='migration_test'",
                    )
                    .get(),
            ).toBeUndefined();
        });
    });

    describe("wasApplied", () => {
        it("should return false when migration was not applied", async () => {
            const migration = new TestMigration1();

            const result = await migration.wasApplied(schema);

            expect(result).toBe(false);
        });

        it("should return true when migration was applied", async () => {
            const migration = new TestMigration1();
            await migration.apply(schema);

            const result = await migration.wasApplied(schema);

            expect(result).toBe(true);
        });

        it("should check correct migration number", async () => {
            const migration1 = new TestMigration1();
            const migration2 = new TestMigration2();

            await migration1.apply(schema);

            expect(await migration1.wasApplied(schema)).toBe(true);
            expect(await migration2.wasApplied(schema)).toBe(false);
        });
    });

    describe("apply", () => {
        it("should execute the up method", async () => {
            const migration = new TestMigration1();

            await migration.apply(schema);

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='migration_test'",
                )
                .get();

            expect(result).toBeDefined();
        });

        it("should record the migration", async () => {
            const migration = new TestMigration1();

            await migration.apply(schema);

            expect(schema.isMigrationApplied(1)).toBe(true);
        });

        it("should record migration with correct name", async () => {
            const migration = new TestMigration1();

            await migration.apply(schema);

            const db = DatabaseManager.getInstance();
            const result = db
                .getConnection()
                .prepare(
                    "SELECT migration_name FROM migrations WHERE migration_number = ?",
                )
                .get(1) as { migration_name: string } | undefined;

            expect(result?.migration_name).toBe("TestMigration1");
        });

        it("should apply multiple migrations", async () => {
            const migration1 = new TestMigration1();
            const migration2 = new TestMigration2();

            await migration1.apply(schema);
            await migration2.apply(schema);

            expect(schema.isMigrationApplied(1)).toBe(true);
            expect(schema.isMigrationApplied(2)).toBe(true);
        });
    });

    describe("migration ordering", () => {
        it("should apply migrations in correct order", async () => {
            const migrations = [new TestMigration2(), new TestMigration1()];
            migrations.sort(
                (a, b) => a.getMigrationNumber() - b.getMigrationNumber(),
            );

            expect(migrations[0]).toBeInstanceOf(TestMigration1);
            expect(migrations[1]).toBeInstanceOf(TestMigration2);
        });
    });
});

