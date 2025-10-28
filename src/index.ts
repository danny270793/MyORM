import { Model } from "./libraries/models/model";
import { Column } from "./libraries/models/column";
import { Schema } from "./libraries/schema";
import { Logger } from "./libraries/logger";
import { Migration } from "./libraries/migrations/migration";
import { TableBuilder } from "./libraries/migrations/tableBuilder";

const logger = new Logger('./src/index.ts');

class User extends Model {
    static readonly tableName = "users";
    
    getId(): string | number {
        return this.id.get();
    }

    id: Column = new Column("id", "number")
    name: Column = new Column("name", "string")
    email: Column = new Column("email", "string")
    active: Column = new Column("active", "boolean")
    lastLogin: Column = new Column("lastLogin", "date")
}

class CreateUsersTableMigration extends Migration {
    getMigrationNumber(): number {
        return 1;
    }

    up(schema: Schema): void {
        schema.createTable("users", (table: TableBuilder) => {
            table.column("id", "number").primaryKey().autoIncrement()
            table.column("name", "string").nullable()
            table.column("email", "string").unique()
            table.column("active", "boolean").notNull()
            table.column("lastLogin", "date").default(new Date())
        });
    }

    down(schema: Schema): void {
        schema.dropTable("users");
    }
}

async function setup(): Promise<void> {
    const migrations: Migration[] = [
        new CreateUsersTableMigration()
    ];
    logger.debug('migrations to apply', migrations.length);
    migrations.sort((a, b) => a.getMigrationNumber() - b.getMigrationNumber());

    const schema: Schema = new Schema();
    for (const migration of migrations) {
        if(await migration.wasApplied(schema)) {
            logger.debug('migration already applied', migration.getMigrationNumber());
            continue
        }

        logger.debug('applying migration', migration.constructor.name);
        migration.up(schema);
    }
}

async function main(): Promise<void> {
    await setup();
    
    const newUser: User = await User.create({
        name: "John Doe",
        email: "john.doe@example.com",
        active: true,
        lastLogin: new Date()
    });
    logger.debug('user created', newUser);

    const users = await User.findAll();
    logger.debug('users found', users);

    const user: User = await User.find("1");
    user.name.set("Jane Doe");

    await user.save();
    logger.debug('user updated', user);

    await user.delete();
    logger.debug('user deleted', user);
}

main().catch(console.error);
