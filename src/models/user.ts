import { Column } from "../libraries/models/column";
import { Model } from "../libraries/models/model";

export class User extends Model {
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
