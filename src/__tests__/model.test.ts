import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Model } from "../libraries/models/model";
import { Column } from "../libraries/models/column";
import { DatabaseManager } from "../libraries/database";
import { Schema } from "../libraries/schema";

class TestUser extends Model {
    static readonly tableName = "test_users";

    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column("id", "number");
    name: Column = new Column("name", "string");
    email: Column = new Column("email", "string");
    age: Column = new Column("age", "number");
    active: Column = new Column("active", "boolean");
}

class TestProduct extends Model {
    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column("id", "number");
    title: Column = new Column("title", "string");
    price: Column = new Column("price", "number");
}

describe("Model", () => {
    beforeEach(() => {
        // Create test tables
        const db = DatabaseManager.getInstance();
        db.getConnection()
            .prepare(
                `CREATE TABLE IF NOT EXISTS test_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                age INTEGER,
                active INTEGER
            )`,
            )
            .run();

        db.getConnection()
            .prepare(
                `CREATE TABLE IF NOT EXISTS test_product (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                price INTEGER
            )`,
            )
            .run();
    });

    afterEach(() => {
        // Clean up tables
        const db = DatabaseManager.getInstance();
        db.getConnection().prepare("DROP TABLE IF EXISTS test_users").run();
        db.getConnection().prepare("DROP TABLE IF EXISTS test_product").run();
    });

    describe("getTableName", () => {
        it("should return explicit table name when provided", () => {
            expect((TestUser as any).getTableName()).toBe("test_users");
        });

        it("should generate table name from class name", () => {
            expect((TestProduct as any).getTableName()).toBe("test_product");
        });
    });

    describe("create", () => {
        it("should create a new record in the database", async () => {
            const user = await TestUser.create({
                name: "John Doe",
                email: "john@example.com",
                age: 30,
                active: true,
            });

            expect(user).toBeInstanceOf(TestUser);
            expect(user.name.get()).toBe("John Doe");
            expect(user.email.get()).toBe("john@example.com");
            expect(user.age.get()).toBe(30);
            expect(user.active.get()).toBe(true);
        });

        it("should set the ID after creation", async () => {
            const user = await TestUser.create({
                name: "Jane Doe",
                email: "jane@example.com",
                age: 25,
                active: true,
            });

            expect(user.id.get()).toBeDefined();
            expect(typeof user.id.get()).toBe("number");
        });

        it("should create multiple records", async () => {
            const user1 = await TestUser.create({
                name: "User 1",
                email: "user1@example.com",
                age: 20,
                active: true,
            });
            const user2 = await TestUser.create({
                name: "User 2",
                email: "user2@example.com",
                age: 30,
                active: false,
            });

            expect(user1.id.get()).not.toBe(user2.id.get());
            expect(user1.name.get()).toBe("User 1");
            expect(user2.name.get()).toBe("User 2");
        });

        it("should handle boolean values correctly", async () => {
            const activeUser = await TestUser.create({
                name: "Active User",
                email: "active@example.com",
                age: 25,
                active: true,
            });
            const inactiveUser = await TestUser.create({
                name: "Inactive User",
                email: "inactive@example.com",
                age: 25,
                active: false,
            });

            expect(activeUser.active.get()).toBe(true);
            expect(inactiveUser.active.get()).toBe(false);
        });
    });

    describe("find", () => {
        it("should find a record by ID", async () => {
            const created = await TestUser.create({
                name: "Find Me",
                email: "findme@example.com",
                age: 28,
                active: true,
            });

            const found = await TestUser.find(String(created.id.get()));

            expect(found).toBeInstanceOf(TestUser);
            expect(found.name.get()).toBe("Find Me");
            expect(found.email.get()).toBe("findme@example.com");
        });

        it("should throw error when record not found", async () => {
            await expect(TestUser.find("999999")).rejects.toThrow();
        });

        it("should convert SQLite values correctly", async () => {
            const created = await TestUser.create({
                name: "Test User",
                email: "test@example.com",
                age: 35,
                active: true,
            });

            const found = await TestUser.find(String(created.id.get()));

            // Boolean should be converted from SQLite integer (1) to true
            expect(found.active.get()).toBe(true);
            expect(typeof found.active.get()).toBe("boolean");
        });
    });

    describe("findAll", () => {
        it("should return empty array when no records exist", async () => {
            const users = await TestUser.findAll();

            expect(users).toEqual([]);
        });

        it("should find all records", async () => {
            await TestUser.create({
                name: "User 1",
                email: "user1@example.com",
                age: 20,
                active: true,
            });
            await TestUser.create({
                name: "User 2",
                email: "user2@example.com",
                age: 30,
                active: false,
            });
            await TestUser.create({
                name: "User 3",
                email: "user3@example.com",
                age: 40,
                active: true,
            });

            const users = await TestUser.findAll();

            expect(users).toHaveLength(3);
            expect(users[0]).toBeInstanceOf(TestUser);
            expect(users[1]).toBeInstanceOf(TestUser);
            expect(users[2]).toBeInstanceOf(TestUser);
        });

        it("should convert values correctly for all records", async () => {
            await TestUser.create({
                name: "Active",
                email: "active@example.com",
                age: 25,
                active: true,
            });
            await TestUser.create({
                name: "Inactive",
                email: "inactive@example.com",
                age: 25,
                active: false,
            });

            const users = await TestUser.findAll();

            expect(users[0]?.active.get()).toBe(true);
            expect(users[1]?.active.get()).toBe(false);
        });
    });

    describe("save", () => {
        it("should update existing record", async () => {
            const user = await TestUser.create({
                name: "Original Name",
                email: "original@example.com",
                age: 25,
                active: true,
            });

            user.name.set("Updated Name");
            user.email.set("updated@example.com");
            await user.save();

            const found = await TestUser.find(String(user.id.get()));
            expect(found.name.get()).toBe("Updated Name");
            expect(found.email.get()).toBe("updated@example.com");
        });

        it("should update only changed fields", async () => {
            const user = await TestUser.create({
                name: "Test User",
                email: "test@example.com",
                age: 30,
                active: true,
            });

            user.age.set(31);
            await user.save();

            const found = await TestUser.find(String(user.id.get()));
            expect(found.age.get()).toBe(31);
            expect(found.name.get()).toBe("Test User");
        });

        it("should not update id field", async () => {
            const user = await TestUser.create({
                name: "Test",
                email: "test@example.com",
                age: 25,
                active: true,
            });
            const originalId = user.id.get();

            user.name.set("Updated");
            await user.save();

            expect(user.id.get()).toBe(originalId);
        });
    });

    describe("delete", () => {
        it("should delete a record from database", async () => {
            const user = await TestUser.create({
                name: "Delete Me",
                email: "delete@example.com",
                age: 25,
                active: true,
            });
            const id = user.id.get();

            await user.delete();

            await expect(TestUser.find(String(id))).rejects.toThrow();
        });

        it("should throw error when deleting unsaved model", async () => {
            const user = new TestUser();

            await expect(user.delete()).rejects.toThrow(
                "Model not saved in database yet",
            );
        });

        it("should be able to delete multiple records", async () => {
            const user1 = await TestUser.create({
                name: "User 1",
                email: "user1@example.com",
                age: 25,
                active: true,
            });
            const user2 = await TestUser.create({
                name: "User 2",
                email: "user2@example.com",
                age: 30,
                active: true,
            });

            await user1.delete();
            await user2.delete();

            const users = await TestUser.findAll();
            expect(users).toHaveLength(0);
        });
    });

    describe("convertFromSQLite", () => {
        it("should convert boolean values", () => {
            expect((TestUser as any).convertFromSQLite(1, "boolean")).toBe(
                true,
            );
            expect((TestUser as any).convertFromSQLite(0, "boolean")).toBe(
                false,
            );
            expect((TestUser as any).convertFromSQLite(true, "boolean")).toBe(
                true,
            );
            expect((TestUser as any).convertFromSQLite(false, "boolean")).toBe(
                false,
            );
        });

        it("should convert date values", () => {
            const dateString = "2025-01-01T00:00:00.000Z";
            const result = (TestUser as any).convertFromSQLite(
                dateString,
                "date",
            );

            expect(result).toBeInstanceOf(Date);
            expect(result.toISOString()).toBe(dateString);
        });

        it("should handle null values", () => {
            expect((TestUser as any).convertFromSQLite(null, "string")).toBeNull();
            expect((TestUser as any).convertFromSQLite(null, "number")).toBeNull();
            expect((TestUser as any).convertFromSQLite(null, "boolean")).toBeNull();
        });

        it("should handle undefined values", () => {
            expect(
                (TestUser as any).convertFromSQLite(undefined, "string"),
            ).toBeUndefined();
        });

        it("should pass through other types unchanged", () => {
            expect((TestUser as any).convertFromSQLite(42, "number")).toBe(42);
            expect((TestUser as any).convertFromSQLite("text", "string")).toBe(
                "text",
            );
        });
    });
});

