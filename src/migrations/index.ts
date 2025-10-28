import { Migration } from "../libraries/migrations/migration";
import { CreateUsersTable } from "./create-users-table";

export const migrations: Migration[] = [
    new CreateUsersTable()
];
