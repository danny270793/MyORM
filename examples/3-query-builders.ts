/**
 * Example 3: Query Builders
 * 
 * This example demonstrates:
 * - Using Select, Insert, Update, Delete query builders
 * - WHERE clauses with different operators
 * - Working with prepared statements
 * - Direct database access
 */

import {
    Select,
    Insert,
    Update,
    Delete,
    DatabaseManager,
    Schema,
    TableBuilder,
    Logger,
} from '../src/index';

const logger = new Logger('./examples/3-query-builders.ts');

async function setupDatabase() {
    const schema = new Schema();

    // Create a books table for this example
    schema.createTable('books', (table: TableBuilder) => {
        table.column('id', 'number').primaryKey().autoIncrement();
        table.column('title', 'string').notNull();
        table.column('author', 'string').notNull();
        table.column('year', 'number').notNull();
        table.column('rating', 'number').default(0);
        table.column('available', 'boolean').default(true);
    });

    logger.debug('✓ Database setup complete');
}

async function runExample() {
    logger.debug('=== Example 3: Query Builders ===');

    await setupDatabase();
    const db = DatabaseManager.getInstance();

    // INSERT - Add books using query builder
    logger.debug('\n--- Inserting Books ---');

    const insertQuery1 = Insert.into('books').rows({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        rating: 4.5,
        available: true,
    });
    const stmt1 = insertQuery1.toPreparedStatement();
    logger.debug('SQL:', stmt1.sql);
    db.getConnection().prepare(stmt1.sql).run(...stmt1.params);
    logger.debug('✓ Inserted: The Great Gatsby');

    const insertQuery2 = Insert.into('books').rows({
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        rating: 4.8,
        available: true,
    });
    const stmt2 = insertQuery2.toPreparedStatement();
    db.getConnection().prepare(stmt2.sql).run(...stmt2.params);
    logger.debug('✓ Inserted: 1984');

    const insertQuery3 = Insert.into('books').rows({
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        rating: 4.7,
        available: false,
    });
    const stmt3 = insertQuery3.toPreparedStatement();
    db.getConnection().prepare(stmt3.sql).run(...stmt3.params);
    logger.debug('✓ Inserted: To Kill a Mockingbird');

    // SELECT - Find all books
    logger.debug('\n--- Selecting All Books ---');
    const selectAllQuery = Select.from('books');
    const selectAllStmt = selectAllQuery.toPreparedStatement();
    logger.debug('SQL:', selectAllStmt.sql);
    const allBooks = db
        .getConnection()
        .prepare(selectAllStmt.sql)
        .all(...selectAllStmt.params);
    logger.debug(`Found ${allBooks.length} books`);

    // SELECT - Find books with WHERE clause
    logger.debug('\n--- Selecting Books with WHERE Clause ---');
    const selectWhereQuery = Select.from('books').where({
        field: 'available',
        operator: '=',
        value: true,
    });
    const selectWhereStmt = selectWhereQuery.toPreparedStatement();
    logger.debug('SQL:', selectWhereStmt.sql);
    logger.debug('Params:', selectWhereStmt.params);
    const availableBooks = db
        .getConnection()
        .prepare(selectWhereStmt.sql)
        .all(...selectWhereStmt.params);
    logger.debug(`Found ${availableBooks.length} available books`);

    // SELECT - Find books with comparison operators
    logger.debug('\n--- Selecting Books Published After 1940 ---');
    const selectCompareQuery = Select.from('books').where({
        field: 'year',
        operator: '>',
        value: 1940,
    });
    const selectCompareStmt = selectCompareQuery.toPreparedStatement();
    logger.debug('SQL:', selectCompareStmt.sql);
    const modernBooks = db
        .getConnection()
        .prepare(selectCompareStmt.sql)
        .all(...selectCompareStmt.params);
    logger.debug(`Found ${modernBooks.length} books published after 1940`);

    // UPDATE - Update a book's rating
    logger.debug('\n--- Updating Book Rating ---');
    const updateQuery = Update.table('books')
        .set({ rating: 5.0 })
        .where({ field: 'title', operator: '=', value: '1984' });
    const updateStmt = updateQuery.toPreparedStatement();
    logger.debug('SQL:', updateStmt.sql);
    logger.debug('Params:', updateStmt.params);
    db.getConnection().prepare(updateStmt.sql).run(...updateStmt.params);
    logger.debug('✓ Updated rating for 1984 to 5.0');

    // UPDATE - Make a book available
    logger.debug('\n--- Making Book Available ---');
    const updateAvailableQuery = Update.table('books')
        .set({ available: true })
        .where({
            field: 'title',
            operator: '=',
            value: 'To Kill a Mockingbird',
        });
    const updateAvailableStmt = updateAvailableQuery.toPreparedStatement();
    db.getConnection()
        .prepare(updateAvailableStmt.sql)
        .run(...updateAvailableStmt.params);
    logger.debug('✓ To Kill a Mockingbird is now available');

    // SELECT - Verify the update
    logger.debug('\n--- Verifying Updates ---');
    const verifyQuery = Select.from('books').where({
        field: 'title',
        operator: '=',
        value: '1984',
    });
    const verifyStmt = verifyQuery.toPreparedStatement();
    const updatedBook = db
        .getConnection()
        .prepare(verifyStmt.sql)
        .get(...verifyStmt.params);
    logger.debug('1984 rating:', updatedBook);

    // DELETE - Remove a book
    logger.debug('\n--- Deleting a Book ---');
    const deleteQuery = Delete.from('books').where({
        field: 'title',
        operator: '=',
        value: 'The Great Gatsby',
    });
    const deleteStmt = deleteQuery.toPreparedStatement();
    logger.debug('SQL:', deleteStmt.sql);
    db.getConnection().prepare(deleteStmt.sql).run(...deleteStmt.params);
    logger.debug('✓ Deleted The Great Gatsby');

    // SELECT - Count remaining books
    logger.debug('\n--- Final Book Count ---');
    const finalCount = db
        .getConnection()
        .prepare(selectAllStmt.sql)
        .all(...selectAllStmt.params);
    logger.debug(`Remaining books: ${finalCount.length}`);

    logger.debug('\n=== Example Complete ===');
}

// Only run if this file is executed directly
if (require.main === module) {
    runExample().catch((error) => {
        console.error('Error running example:', error);
        process.exit(1);
    });
}

export { runExample };

