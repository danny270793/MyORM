import { describe, it, expect } from "vitest";
import { Select } from "../libraries/basics/select";
import { Insert } from "../libraries/basics/insert";
import { Update } from "../libraries/basics/update";
import { Delete } from "../libraries/basics/delete";

describe("Query Builders", () => {
    describe("Select", () => {
        it("should create a basic SELECT query", () => {
            const query = Select.from("users");
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe("SELECT * FROM users");
            expect(statement.params).toEqual([]);
        });

        it("should create a SELECT with WHERE clause", () => {
            const query = Select.from("users").where({
                field: "id",
                operator: "=",
                value: 1,
            });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe("SELECT * FROM users WHERE id = ?");
            expect(statement.params).toEqual([1]);
        });

        it("should handle different operators in WHERE", () => {
            const query1 = Select.from("users").where({
                field: "age",
                operator: ">",
                value: 18,
            });
            expect(query1.toPreparedStatement().sql).toContain("age > ?");

            const query2 = Select.from("users").where({
                field: "age",
                operator: "<",
                value: 65,
            });
            expect(query2.toPreparedStatement().sql).toContain("age < ?");

            const query3 = Select.from("users").where({
                field: "name",
                operator: "LIKE",
                value: "%John%",
            });
            expect(query3.toPreparedStatement().sql).toContain("name LIKE ?");
        });

        it("should handle string values in WHERE", () => {
            const query = Select.from("users").where({
                field: "email",
                operator: "=",
                value: "test@example.com",
            });
            const statement = query.toPreparedStatement();

            expect(statement.params).toEqual(["test@example.com"]);
        });

        it("should handle null values", () => {
            const query = Select.from("users").where({
                field: "deleted_at",
                operator: "=",
                value: null,
            });
            const statement = query.toPreparedStatement();

            // null is converted to literal NULL in SQL, not a parameter
            expect(statement.sql).toContain("deleted_at = NULL");
            expect(statement.params).toEqual([]);
        });
    });

    describe("Insert", () => {
        it("should create a basic INSERT query", () => {
            const query = Insert.into("users").rows({
                name: "John Doe",
                email: "john@example.com",
            });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe(
                "INSERT INTO users (name, email) VALUES (?, ?)",
            );
            expect(statement.params).toEqual(["John Doe", "john@example.com"]);
        });

        it("should handle single column insert", () => {
            const query = Insert.into("logs").rows({ message: "Test log" });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe("INSERT INTO logs (message) VALUES (?)");
            expect(statement.params).toEqual(["Test log"]);
        });

        it("should handle multiple columns", () => {
            const query = Insert.into("users").rows({
                name: "Jane",
                email: "jane@example.com",
                age: 25,
                active: true,
            });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe(
                "INSERT INTO users (name, email, age, active) VALUES (?, ?, ?, ?)",
            );
            // Boolean is converted to 0/1 for SQLite
            expect(statement.params).toEqual([
                "Jane",
                "jane@example.com",
                25,
                1, // true becomes 1
            ]);
        });

        it("should handle different data types", () => {
            const date = new Date("2025-01-01");
            const query = Insert.into("records").rows({
                text: "test",
                number: 42,
                boolean: false,
                date: date,
                nullValue: null,
            });
            const statement = query.toPreparedStatement();

            // Values are converted for SQLite: boolean to 0/1, Date to ISO string, null to literal NULL
            expect(statement.params).toEqual([
                "test",
                42,
                0, // false becomes 0
                date.toISOString(), // Date becomes ISO string
            ]);
            expect(statement.sql).toContain("NULL"); // null becomes literal NULL in SQL
        });
    });

    describe("Update", () => {
        it("should create a basic UPDATE query", () => {
            const query = Update.table("users")
                .set({ name: "Updated Name" })
                .where({ field: "id", operator: "=", value: 1 });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe(
                "UPDATE users SET name = ? WHERE id = ?",
            );
            expect(statement.params).toEqual(["Updated Name", 1]);
        });

        it("should update multiple columns", () => {
            const query = Update.table("users")
                .set({
                    name: "New Name",
                    email: "new@example.com",
                    age: 30,
                })
                .where({ field: "id", operator: "=", value: 5 });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe(
                "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
            );
            expect(statement.params).toEqual([
                "New Name",
                "new@example.com",
                30,
                5,
            ]);
        });

        it("should handle boolean and null values", () => {
            const query = Update.table("users")
                .set({ active: false, deleted_at: null })
                .where({ field: "id", operator: "=", value: 1 });
            const statement = query.toPreparedStatement();

            // Boolean becomes 0, null becomes literal NULL (not in params)
            expect(statement.sql).toContain("deleted_at = NULL");
            expect(statement.params).toEqual([0, 1]); // false becomes 0
        });

        it("should handle date values", () => {
            const date = new Date("2025-01-01");
            const query = Update.table("users")
                .set({ updated_at: date })
                .where({ field: "id", operator: "=", value: 1 });
            const statement = query.toPreparedStatement();

            // Date is converted to ISO string for SQLite
            expect(statement.params).toEqual([date.toISOString(), 1]);
        });
    });

    describe("Delete", () => {
        it("should create a basic DELETE query", () => {
            const query = Delete.from("users").where({
                field: "id",
                operator: "=",
                value: 1,
            });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe("DELETE FROM users WHERE id = ?");
            expect(statement.params).toEqual([1]);
        });

        it("should handle different WHERE conditions", () => {
            const query = Delete.from("logs").where({
                field: "created_at",
                operator: "<",
                value: "2024-01-01",
            });
            const statement = query.toPreparedStatement();

            expect(statement.sql).toBe(
                "DELETE FROM logs WHERE created_at < ?",
            );
            expect(statement.params).toEqual(["2024-01-01"]);
        });

        it("should handle string field values", () => {
            const query = Delete.from("sessions").where({
                field: "token",
                operator: "=",
                value: "expired_token_123",
            });
            const statement = query.toPreparedStatement();

            expect(statement.params).toEqual(["expired_token_123"]);
        });
    });
});

