import { Model } from "./libraries/models/model";
import { Column } from "./libraries/models/column";

class User extends Model {
    getId(): string {
        return this.id.get();
    }

    id: Column = new Column("id", "string")
    name: Column = new Column("name", "string")
    email: Column = new Column("email", "string")
    active: Column = new Column("active", "boolean")
    lastLogin: Column = new Column("lastLogin", "date")
}


async function main(): Promise<void> {
    const newUser: User = await User.create({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        active: true,
        lastLogin: new Date()
    });
    console.log('user created', newUser);

    const users = await User.findAll();
    console.log('users found', users);

    const user: User = await User.find("1");
    user.name.set("Jane Doe");

    await user.save();
    console.log('user updated', user);

    await user.delete();
    console.log('user deleted', user);
}

main().catch(console.error);
