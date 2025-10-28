import { Schema } from '../schema';

export abstract class Migration {
    abstract getMigrationNumber(): number;
    abstract up(schema: Schema): void;
    abstract down(schema: Schema): void;

    async wasApplied(schema: Schema): Promise<boolean> {
        return schema.isMigrationApplied(this.getMigrationNumber());
    }

    async apply(schema: Schema): Promise<void> {
        this.up(schema);
        schema.recordMigration(
            this.getMigrationNumber(),
            this.constructor.name,
        );
    }
}
