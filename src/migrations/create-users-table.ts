import { Migration } from '../libraries/migrations/migration';
import { TableBuilder } from '../libraries/migrations/tableBuilder';
import { Schema } from '../libraries/schema';

export class CreateUsersTable extends Migration {
    getMigrationNumber(): number {
        return 1;
    }

    up(schema: Schema): void {
        schema.createTable('users', (table: TableBuilder) => {
            table.column('id', 'number').primaryKey().autoIncrement();
            table.column('name', 'string').nullable();
            table.column('email', 'string').unique();
            table.column('active', 'boolean').notNull();
            table.column('lastLogin', 'date').default(new Date());
        });
    }

    down(schema: Schema): void {
        schema.dropTable('users');
    }
}
