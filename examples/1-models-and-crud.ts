/**
 * Example 1: Models and CRUD Operations
 * 
 * This example demonstrates:
 * - Creating a model class
 * - Basic CRUD operations (Create, Read, Update, Delete)
 * - Working with different column types
 */

import { Model, Column, Logger, Schema, TableBuilder } from '../src/index';

const logger = new Logger('./examples/1-models-and-crud.ts');

/**
 * Define a Product model
 */
class Product extends Model {
    static readonly tableName = 'products';

    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column('id', 'number');
    name: Column = new Column('name', 'string');
    description: Column = new Column('description', 'string');
    price: Column = new Column('price', 'number');
    inStock: Column = new Column('inStock', 'boolean');
    createdAt: Column = new Column('createdAt', 'date');
}

async function runExample() {
    logger.debug('=== Example 1: Models and CRUD Operations ===');

    // Setup: Create the products table
    logger.debug('\n--- Setting Up Database ---');
    const schema = new Schema();
    schema.createTable('products', (table: TableBuilder) => {
        table.column('id', 'number').primaryKey().autoIncrement();
        table.column('name', 'string').notNull();
        table.column('description', 'string');
        table.column('price', 'number').notNull();
        table.column('inStock', 'boolean').default(true);
        table.column('createdAt', 'date').default(new Date());
    });
    logger.debug('✓ Products table created');

    // CREATE - Insert new records
    logger.debug('\n--- Creating Products ---');
    const laptop = await Product.create({
        name: 'Laptop Pro 15',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        inStock: true,
        createdAt: new Date(),
    });
    logger.debug('Created laptop:', laptop.name.get());

    const mouse = await Product.create({
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse',
        price: 29.99,
        inStock: true,
        createdAt: new Date(),
    });
    logger.debug('Created mouse:', mouse.name.get());

    const keyboard = await Product.create({
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard',
        price: 149.99,
        inStock: false,
        createdAt: new Date(),
    });
    logger.debug('Created keyboard:', keyboard.name.get());

    // READ - Find all records
    logger.debug('\n--- Finding All Products ---');
    const allProducts = await Product.findAll();
    logger.debug(`Found ${allProducts.length} products`);
    allProducts.forEach((product) => {
        logger.debug(
            `- ${product.name.get()}: $${product.price.get()} (In stock: ${product.inStock.get()})`,
        );
    });

    // READ - Find single record by ID
    logger.debug('\n--- Finding Product by ID ---');
    const foundProduct = await Product.find(String(laptop.id.get()));
    logger.debug('Found product:', {
        id: foundProduct.id.get(),
        name: foundProduct.name.get(),
        price: foundProduct.price.get(),
    });

    // UPDATE - Modify and save
    logger.debug('\n--- Updating Product ---');
    foundProduct.price.set(1199.99); // Price reduction!
    foundProduct.description.set('Premium laptop on sale');
    await foundProduct.save();
    logger.debug('Updated laptop price to:', foundProduct.price.get());

    // UPDATE - Mark keyboard as in stock
    keyboard.inStock.set(true);
    await keyboard.save();
    logger.debug('Keyboard is now in stock');

    // DELETE - Remove a product
    logger.debug('\n--- Deleting Product ---');
    await mouse.delete();
    logger.debug('Deleted mouse product');

    // Verify deletion
    const remainingProducts = await Product.findAll();
    logger.debug(`Remaining products: ${remainingProducts.length}`);

    logger.debug('\n=== Example Complete ===');
}

// Only run if this file is executed directly
if (require.main === module) {
    runExample().catch((error) => {
        console.error('Error running example:', error);
        process.exit(1);
    });
}

export { runExample, Product };

