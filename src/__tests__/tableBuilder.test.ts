import { describe, it, expect } from "vitest";
import { TableBuilder, ColumnBuilder } from "../libraries/migrations/tableBuilder";

describe("TableBuilder", () => {
    describe("constructor", () => {
        it("should create a table builder with a name", () => {
            const builder = new TableBuilder("users");

            expect(builder.getTableName()).toBe("users");
        });
    });

    describe("column", () => {
        it("should add a column to the table", () => {
            const builder = new TableBuilder("users");
            builder.column("id", "number");

            expect(builder.getColumns()).toHaveLength(1);
            expect(builder.getColumns()[0]?.name).toBe("id");
            expect(builder.getColumns()[0]?.type).toBe("number");
        });

        it("should return a ColumnBuilder", () => {
            const builder = new TableBuilder("users");
            const columnBuilder = builder.column("id", "number");

            expect(columnBuilder).toBeInstanceOf(ColumnBuilder);
        });

        it("should add multiple columns", () => {
            const builder = new TableBuilder("users");
            builder.column("id", "number");
            builder.column("name", "string");
            builder.column("email", "string");

            expect(builder.getColumns()).toHaveLength(3);
        });
    });

    describe("toSQL", () => {
        it("should generate basic CREATE TABLE SQL", () => {
            const builder = new TableBuilder("users");
            builder.column("id", "number");

            const sql = builder.toSQL();

            expect(sql).toBe("CREATE TABLE IF NOT EXISTS users (id INTEGER)");
        });

        it("should generate SQL with PRIMARY KEY", () => {
            const builder = new TableBuilder("users");
            builder.column("id", "number").primaryKey();

            const sql = builder.toSQL();

            expect(sql).toContain("PRIMARY KEY");
        });

        it("should generate SQL with AUTOINCREMENT", () => {
            const builder = new TableBuilder("users");
            builder.column("id", "number").primaryKey().autoIncrement();

            const sql = builder.toSQL();

            expect(sql).toContain("AUTOINCREMENT");
        });

        it("should generate SQL with UNIQUE constraint", () => {
            const builder = new TableBuilder("users");
            builder.column("email", "string").unique();

            const sql = builder.toSQL();

            expect(sql).toContain("UNIQUE");
        });

        it("should generate SQL with NOT NULL constraint", () => {
            const builder = new TableBuilder("users");
            builder.column("name", "string").notNull();

            const sql = builder.toSQL();

            expect(sql).toContain("NOT NULL");
        });

        it("should generate SQL with nullable column", () => {
            const builder = new TableBuilder("users");
            builder.column("nickname", "string").nullable();

            const sql = builder.toSQL();

            expect(sql).toContain("NULL");
        });

        it("should generate SQL with DEFAULT value for string", () => {
            const builder = new TableBuilder("users");
            builder.column("status", "string").default("active");

            const sql = builder.toSQL();

            expect(sql).toContain("DEFAULT 'active'");
        });

        it("should generate SQL with DEFAULT value for number", () => {
            const builder = new TableBuilder("users");
            builder.column("age", "number").default(0);

            const sql = builder.toSQL();

            expect(sql).toContain("DEFAULT 0");
        });

        it("should generate SQL with DEFAULT value for boolean", () => {
            const builder = new TableBuilder("users");
            builder.column("active", "boolean").default(true);

            const sql = builder.toSQL();

            expect(sql).toContain("DEFAULT 1");
        });

        it("should generate SQL with DEFAULT value for date", () => {
            const builder = new TableBuilder("users");
            const date = new Date("2025-01-01T00:00:00.000Z");
            builder.column("createdAt", "date").default(date);

            const sql = builder.toSQL();

            expect(sql).toContain("DEFAULT '2025-01-01T00:00:00.000Z'");
        });

        it("should escape single quotes in string defaults", () => {
            const builder = new TableBuilder("users");
            builder.column("name", "string").default("O'Brien");

            const sql = builder.toSQL();

            expect(sql).toContain("DEFAULT 'O''Brien'");
        });

        it("should generate complete table with multiple columns and constraints", () => {
            const builder = new TableBuilder("users");
            builder.column("id", "number").primaryKey().autoIncrement();
            builder.column("name", "string").notNull();
            builder.column("email", "string").unique();
            builder.column("age", "number").nullable();
            builder.column("active", "boolean").default(true);

            const sql = builder.toSQL();

            expect(sql).toContain("CREATE TABLE IF NOT EXISTS users");
            expect(sql).toContain("id INTEGER PRIMARY KEY AUTOINCREMENT");
            expect(sql).toContain("name TEXT NOT NULL");
            expect(sql).toContain("email TEXT UNIQUE");
            expect(sql).toContain("age INTEGER NULL");
            expect(sql).toContain("active INTEGER DEFAULT 1");
        });

        it("should map types correctly to SQL types", () => {
            const builder = new TableBuilder("test");
            builder.column("str", "string");
            builder.column("num", "number");
            builder.column("bool", "boolean");
            builder.column("dt", "date");

            const sql = builder.toSQL();

            expect(sql).toContain("str TEXT");
            expect(sql).toContain("num INTEGER");
            expect(sql).toContain("bool INTEGER");
            expect(sql).toContain("dt TEXT");
        });
    });
});

describe("ColumnBuilder", () => {
    describe("fluent API", () => {
        it("should chain multiple constraints", () => {
            const columnBuilder = new ColumnBuilder("id", "number");
            const result = columnBuilder
                .primaryKey()
                .autoIncrement()
                .notNull();

            expect(result).toBe(columnBuilder);
        });

        it("should accumulate all constraints", () => {
            const columnBuilder = new ColumnBuilder("email", "string");
            columnBuilder.unique().notNull();

            const definition = columnBuilder.getDefinition();

            expect(definition.unique).toBe(true);
            expect(definition.notNull).toBe(true);
        });
    });

    describe("primaryKey", () => {
        it("should mark column as primary key", () => {
            const columnBuilder = new ColumnBuilder("id", "number");
            columnBuilder.primaryKey();

            expect(columnBuilder.getDefinition().primaryKey).toBe(true);
        });
    });

    describe("autoIncrement", () => {
        it("should mark column as auto increment", () => {
            const columnBuilder = new ColumnBuilder("id", "number");
            columnBuilder.autoIncrement();

            expect(columnBuilder.getDefinition().autoIncrement).toBe(true);
        });
    });

    describe("unique", () => {
        it("should mark column as unique", () => {
            const columnBuilder = new ColumnBuilder("email", "string");
            columnBuilder.unique();

            expect(columnBuilder.getDefinition().unique).toBe(true);
        });
    });

    describe("notNull", () => {
        it("should mark column as not null", () => {
            const columnBuilder = new ColumnBuilder("name", "string");
            columnBuilder.notNull();

            expect(columnBuilder.getDefinition().notNull).toBe(true);
        });
    });

    describe("nullable", () => {
        it("should mark column as nullable", () => {
            const columnBuilder = new ColumnBuilder("nickname", "string");
            columnBuilder.nullable();

            expect(columnBuilder.getDefinition().nullable).toBe(true);
        });
    });

    describe("default", () => {
        it("should set default value", () => {
            const columnBuilder = new ColumnBuilder("status", "string");
            columnBuilder.default("active");

            expect(columnBuilder.getDefinition().defaultValue).toBe("active");
        });

        it("should handle different default types", () => {
            expect(
                new ColumnBuilder("age", "number").default(0).getDefinition()
                    .defaultValue,
            ).toBe(0);
            expect(
                new ColumnBuilder("active", "boolean").default(true)
                    .getDefinition().defaultValue,
            ).toBe(true);
            expect(
                new ColumnBuilder("name", "string").default("test")
                    .getDefinition().defaultValue,
            ).toBe("test");
        });
    });
});

