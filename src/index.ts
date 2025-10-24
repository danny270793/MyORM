import { Model } from "./libraries/models/model";
import { Column } from "./libraries/models/column";
import { Schema } from "./libraries/schema";
import { Logger } from "./libraries/logger";

const logger = new Logger('./src/index.ts');

class User extends Model {
    getId(): string {
        return this.id.get();
    }

    id: Column = new Column("id", "number")
    name: Column = new Column("name", "string")
    email: Column = new Column("email", "string")
    active: Column = new Column("active", "boolean")
    lastLogin: Column = new Column("lastLogin", "date")
}


async function main(): Promise<void> {
    // Initialize database schema
    Schema.createTable("user", {
        id: "INTEGER PRIMARY KEY AUTOINCREMENT",
        name: "TEXT",
        email: "TEXT",
        active: "INTEGER",
        lastLogin: "TEXT"
    });
    
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
