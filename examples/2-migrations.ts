/**
 * Example 2: Database Migrations
 * 
 * This example demonstrates:
 * - Creating migration classes
 * - Running migrations with proper ordering
 * - Using the TableBuilder API
 * - Adding constraints (primary key, unique, not null, defaults)
 */

import {
    Migration,
    Schema,
    TableBuilder,
    Migrations,
    Logger,
} from '../src/index';

const logger = new Logger('./examples/2-migrations.ts');

/**
 * Migration 1: Create users table
 */
class CreateUsersTable extends Migration {
    getMigrationNumber(): number {
        return 1;
    }

    up(schema: Schema): void {
        schema.createTable('users', (table: TableBuilder) => {
            table.column('id', 'number').primaryKey().autoIncrement();
            table.column('username', 'string').unique().notNull();
            table.column('email', 'string').unique().notNull();
            table.column('password', 'string').notNull();
            table.column('isAdmin', 'boolean').default(false);
            table.column('createdAt', 'date').default(new Date());
        });
        logger.debug('✓ Created users table');
    }

    down(schema: Schema): void {
        schema.dropTable('users');
        logger.debug('✓ Dropped users table');
    }
}

/**
 * Migration 2: Create posts table
 */
class CreatePostsTable extends Migration {
    getMigrationNumber(): number {
        return 2;
    }

    up(schema: Schema): void {
        schema.createTable('posts', (table: TableBuilder) => {
            table.column('id', 'number').primaryKey().autoIncrement();
            table.column('title', 'string').notNull();
            table.column('content', 'string').notNull();
            table.column('authorId', 'number').notNull();
            table.column('published', 'boolean').default(false);
            table.column('publishedAt', 'date').nullable();
            table.column('createdAt', 'date').default(new Date());
        });
        logger.debug('✓ Created posts table');
    }

    down(schema: Schema): void {
        schema.dropTable('posts');
        logger.debug('✓ Dropped posts table');
    }
}

/**
 * Migration 3: Create comments table
 */
class CreateCommentsTable extends Migration {
    getMigrationNumber(): number {
        return 3;
    }

    up(schema: Schema): void {
        schema.createTable('comments', (table: TableBuilder) => {
            table.column('id', 'number').primaryKey().autoIncrement();
            table.column('postId', 'number').notNull();
            table.column('authorId', 'number').notNull();
            table.column('content', 'string').notNull();
            table.column('createdAt', 'date').default(new Date());
        });
        logger.debug('✓ Created comments table');
    }

    down(schema: Schema): void {
        schema.dropTable('comments');
        logger.debug('✓ Dropped comments table');
    }
}

async function runExample() {
    logger.debug('=== Example 2: Database Migrations ===');

    const migrations = [
        new CreateUsersTable(),
        new CreatePostsTable(),
        new CreateCommentsTable(),
    ];

    logger.debug('\n--- Sorting Migrations by Number ---');
    migrations.sort(
        (a, b) => a.getMigrationNumber() - b.getMigrationNumber(),
    );
    migrations.forEach((migration) => {
        logger.debug(
            `Migration ${migration.getMigrationNumber()}: ${migration.constructor.name}`,
        );
    });

    logger.debug('\n--- Running Migrations ---');
    const schema = new Schema();

    for (const migration of migrations) {
        const wasApplied = await migration.wasApplied(schema);

        if (wasApplied) {
            logger.debug(
                `⊘ Migration ${migration.getMigrationNumber()} already applied, skipping`,
            );
        } else {
            logger.debug(
                `→ Applying migration ${migration.getMigrationNumber()}...`,
            );
            await migration.apply(schema);
        }
    }

    logger.debug('\n--- Migration Status ---');
    for (const migration of migrations) {
        const applied = await migration.wasApplied(schema);
        logger.debug(
            `Migration ${migration.getMigrationNumber()}: ${applied ? '✓ Applied' : '✗ Not Applied'}`,
        );
    }

    logger.debug('\n=== Example Complete ===');
    logger.debug(
        'Note: Tables created: users, posts, comments (plus migrations tracking table)',
    );
}

// Only run if this file is executed directly
if (require.main === module) {
    runExample().catch((error) => {
        console.error('Error running example:', error);
        process.exit(1);
    });
}

export { runExample };

