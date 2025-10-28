import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Model } from "../libraries/models/model";
import { Column } from "../libraries/models/column";
import { Schema } from "../libraries/schema";
import { Migration } from "../libraries/migrations/migration";
import { TableBuilder } from "../libraries/migrations/tableBuilder";
import { DatabaseManager } from "../libraries/database";

// Test Model
class Article extends Model {
    static readonly tableName = "articles";

    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column("id", "number");
    title: Column = new Column("title", "string");
    content: Column = new Column("content", "string");
    published: Column = new Column("published", "boolean");
    publishedAt: Column = new Column("publishedAt", "date");
}

// Test Migration
class CreateArticlesTable extends Migration {
    getMigrationNumber(): number {
        return 100;
    }

    up(schema: Schema): void {
        schema.createTable("articles", (table: TableBuilder) => {
            table.column("id", "number").primaryKey().autoIncrement();
            table.column("title", "string").notNull();
            table.column("content", "string");
            table.column("published", "boolean").default(false);
            table.column("publishedAt", "date");
        });
    }

    down(schema: Schema): void {
        schema.dropTable("articles");
    }
}

describe("Integration Tests", () => {
    let schema: Schema;
    let migration: CreateArticlesTable;

    beforeAll(async () => {
        schema = new Schema();
        migration = new CreateArticlesTable();

        // Apply migration
        if (!(await migration.wasApplied(schema))) {
            await migration.apply(schema);
        }
    });

    afterAll(() => {
        // Clean up
        migration.down(schema);
        const db = DatabaseManager.getInstance();
        db.getConnection()
            .prepare("DELETE FROM migrations WHERE migration_number = 100")
            .run();
    });

    describe("Complete CRUD flow", () => {
        it("should handle full lifecycle of a record", async () => {
            // Create
            const article = await Article.create({
                title: "Test Article",
                content: "This is test content",
                published: false,
                publishedAt: new Date("2025-01-01"),
            });

            expect(article.id.get()).toBeDefined();
            expect(article.title.get()).toBe("Test Article");

            // Read (find)
            const found = await Article.find(String(article.id.get()));
            expect(found.title.get()).toBe("Test Article");
            expect(found.content.get()).toBe("This is test content");
            expect(found.published.get()).toBe(false);

            // Update
            found.title.set("Updated Article");
            found.published.set(true);
            await found.save();

            const updated = await Article.find(String(article.id.get()));
            expect(updated.title.get()).toBe("Updated Article");
            expect(updated.published.get()).toBe(true);

            // Delete
            await updated.delete();
            await expect(
                Article.find(String(article.id.get())),
            ).rejects.toThrow();
        });

        it("should handle multiple records", async () => {
            // Create multiple records
            const article1 = await Article.create({
                title: "Article 1",
                content: "Content 1",
                published: true,
                publishedAt: new Date(),
            });

            const article2 = await Article.create({
                title: "Article 2",
                content: "Content 2",
                published: false,
                publishedAt: new Date(),
            });

            const article3 = await Article.create({
                title: "Article 3",
                content: "Content 3",
                published: true,
                publishedAt: new Date(),
            });

            // Find all
            const articles = await Article.findAll();
            expect(articles.length).toBeGreaterThanOrEqual(3);

            // Clean up
            await article1.delete();
            await article2.delete();
            await article3.delete();

            const remaining = await Article.findAll();
            expect(remaining).toHaveLength(0);
        });
    });

    describe("Type conversions", () => {
        it("should correctly handle date types", async () => {
            const publishDate = new Date("2025-06-15T10:30:00.000Z");
            const article = await Article.create({
                title: "Date Test",
                content: "Testing dates",
                published: true,
                publishedAt: publishDate,
            });

            const found = await Article.find(String(article.id.get()));
            expect(found.publishedAt.get()).toBeInstanceOf(Date);
            expect(found.publishedAt.get().toISOString()).toBe(
                publishDate.toISOString(),
            );

            await article.delete();
        });

        it("should correctly handle boolean types", async () => {
            const published = await Article.create({
                title: "Published",
                content: "Content",
                published: true,
                publishedAt: new Date(),
            });

            const unpublished = await Article.create({
                title: "Unpublished",
                content: "Content",
                published: false,
                publishedAt: new Date(),
            });

            const foundPublished = await Article.find(
                String(published.id.get()),
            );
            const foundUnpublished = await Article.find(
                String(unpublished.id.get()),
            );

            expect(foundPublished.published.get()).toBe(true);
            expect(typeof foundPublished.published.get()).toBe("boolean");
            expect(foundUnpublished.published.get()).toBe(false);
            expect(typeof foundUnpublished.published.get()).toBe("boolean");

            await published.delete();
            await unpublished.delete();
        });

        it("should handle string types with special characters", async () => {
            const article = await Article.create({
                title: "Test with 'quotes' and \"double quotes\"",
                content: "Content with\nnewlines\tand\ttabs",
                published: false,
                publishedAt: new Date(),
            });

            const found = await Article.find(String(article.id.get()));
            expect(found.title.get()).toBe(
                "Test with 'quotes' and \"double quotes\"",
            );
            expect(found.content.get()).toBe(
                "Content with\nnewlines\tand\ttabs",
            );

            await article.delete();
        });
    });

    describe("Migration tracking", () => {
        it("should track that migration was applied", async () => {
            expect(schema.isMigrationApplied(100)).toBe(true);
        });

        it("should not apply same migration twice", async () => {
            const wasApplied = await migration.wasApplied(schema);
            expect(wasApplied).toBe(true);

            // Trying to apply again should recognize it's already applied
            if (!(await migration.wasApplied(schema))) {
                await migration.apply(schema);
            }

            // Should still be applied only once
            const db = DatabaseManager.getInstance();
            const count = db
                .getConnection()
                .prepare(
                    "SELECT COUNT(*) as count FROM migrations WHERE migration_number = 100",
                )
                .get() as { count: number };

            expect(count.count).toBe(1);
        });
    });

    describe("Edge cases", () => {
        it("should handle empty content", async () => {
            const article = await Article.create({
                title: "Empty Content",
                content: "",
                published: false,
                publishedAt: new Date(),
            });

            const found = await Article.find(String(article.id.get()));
            expect(found.content.get()).toBe("");

            await article.delete();
        });

        it("should handle very long strings", async () => {
            const longContent = "x".repeat(10000);
            const article = await Article.create({
                title: "Long Content",
                content: longContent,
                published: false,
                publishedAt: new Date(),
            });

            const found = await Article.find(String(article.id.get()));
            expect(found.content.get()).toBe(longContent);
            expect(found.content.get().length).toBe(10000);

            await article.delete();
        });

        it("should handle concurrent creates", async () => {
            const promises = [];
            for (let i = 0; i < 10; i++) {
                promises.push(
                    Article.create({
                        title: `Concurrent ${i}`,
                        content: `Content ${i}`,
                        published: false,
                        publishedAt: new Date(),
                    }),
                );
            }

            const articles = await Promise.all(promises);
            expect(articles).toHaveLength(10);

            // All should have unique IDs
            const ids = articles.map((a) => a.id.get());
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(10);

            // Clean up
            await Promise.all(articles.map((a) => a.delete()));
        });
    });
});

