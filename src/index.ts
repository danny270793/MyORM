import Insert from "./libraries/basics/insert";
import Select from "./libraries/basics/select";
import Update from "./libraries/basics/update";
import Delete from "./libraries/basics/delete";

async function main(): Promise<void> {
    const insert1 = Insert.into("users")
        .rows(
            {
                name: "John Doe",
                email: "john.doe@example.com",
                active: 1,
                lastLogin: new Date()
            },
            {
                name: "Jane Doe",
                email: "jane.doe@example.com",
                active: 1,
                lastLogin: new Date()
            }
        )
        .toSQL();
    console.log("INSERT Query:");
    console.log("SQL:", insert1.sql);
    console.log("Params:", insert1.params);
    console.log();
        
    const select1 = Select.from("users")
        .fields("id", "name", "email")
        .where(
            { field: "active", operator: "=", value: 1 },
            { separator: "and", field: "lastLogin", operator: ">=", value: new Date() }
        )
        .toSQL();
    console.log("SELECT Query:");
    console.log("SQL:", select1.sql);
    console.log("Params:", select1.params);
    console.log();

    const update1 = Update.table("users")
        .set({
            active: 0
        })
        .where({ field: "lastLogin", operator: "<=", value: new Date() })
        .toSQL();
    console.log("UPDATE Query:");
    console.log("SQL:", update1.sql);
    console.log("Params:", update1.params);
    console.log();

    const delete1 = Delete.from("users")
        .where({ field: "active", operator: "=", value: 0 })
        .toSQL();
    console.log("DELETE Query:");
    console.log("SQL:", delete1.sql);
    console.log("Params:", delete1.params);
}

main().catch(console.error);
