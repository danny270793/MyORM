/**
 * Example 4: Type Conversions
 * 
 * This example demonstrates:
 * - How different TypeScript types are stored in SQLite
 * - Automatic type conversion between TypeScript and SQLite
 * - Working with dates, booleans, and other types
 */

import { Model, Column, Schema, TableBuilder, Logger } from '../src/index';

const logger = new Logger('./examples/4-type-conversions.ts');

/**
 * Event model with various column types
 */
class Event extends Model {
    static readonly tableName = 'events';

    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column('id', 'number');
    name: Column = new Column('name', 'string');
    description: Column = new Column('description', 'string');
    startDate: Column = new Column('startDate', 'date');
    endDate: Column = new Column('endDate', 'date');
    isActive: Column = new Column('isActive', 'boolean');
    attendeeCount: Column = new Column('attendeeCount', 'number');
    price: Column = new Column('price', 'number');
}

async function setupDatabase() {
    const schema = new Schema();
    schema.createTable('events', (table: TableBuilder) => {
        table.column('id', 'number').primaryKey().autoIncrement();
        table.column('name', 'string').notNull();
        table.column('description', 'string');
        table.column('startDate', 'date').notNull();
        table.column('endDate', 'date').notNull();
        table.column('isActive', 'boolean').default(true);
        table.column('attendeeCount', 'number').default(0);
        table.column('price', 'number').default(0);
    });
    logger.debug('✓ Database setup complete');
}

async function runExample() {
    logger.debug('=== Example 4: Type Conversions ===');

    await setupDatabase();

    // STRING TYPE
    logger.debug('\n--- String Type ---');
    const conference = await Event.create({
        name: 'Tech Conference 2025',
        description: 'Annual technology conference with speakers from around the world',
        startDate: new Date('2025-06-15'),
        endDate: new Date('2025-06-17'),
        isActive: true,
        attendeeCount: 500,
        price: 299.99,
    });
    logger.debug('Stored string:', conference.name.get());
    logger.debug('Type:', typeof conference.name.get()); // string

    // NUMBER TYPE
    logger.debug('\n--- Number Type ---');
    logger.debug('Attendee count:', conference.attendeeCount.get());
    logger.debug('Type:', typeof conference.attendeeCount.get()); // number
    logger.debug('Price (float):', conference.price.get());
    logger.debug('Type:', typeof conference.price.get()); // number

    // BOOLEAN TYPE
    logger.debug('\n--- Boolean Type ---');
    logger.debug('Is active:', conference.isActive.get());
    logger.debug('Type:', typeof conference.isActive.get()); // boolean
    logger.debug('Note: SQLite stores as INTEGER (0/1), but converts back to boolean');

    // Update boolean
    conference.isActive.set(false);
    await conference.save();
    const reloaded = await Event.find(String(conference.id.get()));
    logger.debug('After update:', reloaded.isActive.get());
    logger.debug('Type:', typeof reloaded.isActive.get()); // boolean

    // DATE TYPE
    logger.debug('\n--- Date Type ---');
    logger.debug('Start date:', conference.startDate.get());
    logger.debug('Type:', conference.startDate.get().constructor.name); // Date
    logger.debug('ISO String:', conference.startDate.get().toISOString());
    logger.debug('Note: SQLite stores as TEXT (ISO 8601), but converts back to Date object');

    // Working with dates
    const workshop = await Event.create({
        name: 'JavaScript Workshop',
        description: 'Hands-on JavaScript workshop',
        startDate: new Date('2025-07-10T09:00:00'),
        endDate: new Date('2025-07-10T17:00:00'),
        isActive: true,
        attendeeCount: 30,
        price: 49.99,
    });

    logger.debug('\n--- Date Operations ---');
    const start = workshop.startDate.get() as Date;
    const end = workshop.endDate.get() as Date;
    const durationMs = end.getTime() - start.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    logger.debug('Workshop duration:', durationHours, 'hours');

    // NULL VALUES
    logger.debug('\n--- Null Values ---');
    const meeting = await Event.create({
        name: 'Team Meeting',
        description: '', // Empty string, not null
        startDate: new Date('2025-05-20T14:00:00'),
        endDate: new Date('2025-05-20T15:00:00'),
        isActive: true,
        attendeeCount: 10,
        price: 0,
    });
    logger.debug('Empty description:', `"${meeting.description.get()}"`);
    logger.debug('Type:', typeof meeting.description.get());

    // TYPE CONVERSION SUMMARY
    logger.debug('\n--- Type Conversion Summary ---');
    const events = await Event.findAll();
    logger.debug(`Total events: ${events.length}`);

    events.forEach((event, index) => {
        logger.debug(`\nEvent ${index + 1}:`);
        logger.debug(
            '  Name (string):',
            event.name.get(),
            `[${typeof event.name.get()}]`,
        );
        logger.debug(
            '  Active (boolean):',
            event.isActive.get(),
            `[${typeof event.isActive.get()}]`,
        );
        logger.debug(
            '  Price (number):',
            event.price.get(),
            `[${typeof event.price.get()}]`,
        );
        logger.debug(
            '  Start Date (date):',
            event.startDate.get().toISOString(),
            `[${event.startDate.get().constructor.name}]`,
        );
    });

    logger.debug('\n=== Example Complete ===');
    logger.debug('\nType Mapping:');
    logger.debug('  TypeScript → SQLite');
    logger.debug('  string     → TEXT');
    logger.debug('  number     → INTEGER');
    logger.debug('  boolean    → INTEGER (0/1)');
    logger.debug('  Date       → TEXT (ISO 8601)');
}

// Only run if this file is executed directly
if (require.main === module) {
    runExample().catch((error) => {
        console.error('Error running example:', error);
        process.exit(1);
    });
}

export { runExample, Event };

