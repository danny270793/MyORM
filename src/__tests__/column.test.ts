import { describe, it, expect, beforeEach } from "vitest";
import { Column } from "../libraries/models/column";

describe("Column", () => {
    describe("constructor", () => {
        it("should create a column with name and type", () => {
            const column = new Column("email", "string");

            expect(column.getName()).toBe("email");
            expect(column.getType()).toBe("string");
        });
    });

    describe("get and set", () => {
        let column: Column;

        beforeEach(() => {
            column = new Column("age", "number");
        });

        it("should set and get a value", () => {
            column.set(25);

            expect(column.get()).toBe(25);
        });

        it("should update existing value", () => {
            column.set(25);
            column.set(30);

            expect(column.get()).toBe(30);
        });

        it("should handle different types", () => {
            const stringColumn = new Column("name", "string");
            stringColumn.set("John");
            expect(stringColumn.get()).toBe("John");

            const booleanColumn = new Column("active", "boolean");
            booleanColumn.set(true);
            expect(booleanColumn.get()).toBe(true);

            const dateColumn = new Column("createdAt", "date");
            const date = new Date("2025-01-01");
            dateColumn.set(date);
            expect(dateColumn.get()).toBe(date);
        });

        it("should handle null values", () => {
            column.set(null);

            expect(column.get()).toBeNull();
        });

        it("should handle undefined values", () => {
            column.set(undefined);

            expect(column.get()).toBeUndefined();
        });
    });

    describe("getName", () => {
        it("should return the column name", () => {
            const column = new Column("username", "string");

            expect(column.getName()).toBe("username");
        });
    });

    describe("getType", () => {
        it("should return the column type", () => {
            const column = new Column("count", "number");

            expect(column.getType()).toBe("number");
        });

        it("should support different types", () => {
            expect(new Column("name", "string").getType()).toBe("string");
            expect(new Column("age", "number").getType()).toBe("number");
            expect(new Column("active", "boolean").getType()).toBe("boolean");
            expect(new Column("createdAt", "date").getType()).toBe("date");
        });
    });
});

