import { migrations } from '../../migrations';
import { Logger } from '../logger';
import { Schema } from '../schema';

const logger: Logger = new Logger('./src/libraries/migrations/index.ts');

export class Migrations {
    static async setup(): Promise<void> {
        logger.debug('migrations to apply', migrations.length);
        migrations.sort(
            (a, b) => a.getMigrationNumber() - b.getMigrationNumber(),
        );

        const schema: Schema = new Schema();
        for (const migration of migrations) {
            if (await migration.wasApplied(schema)) {
                logger.debug(
                    'migration already applied',
                    migration.getMigrationNumber(),
                );
                continue;
            }

            logger.debug('applying migration', migration.constructor.name);
            migration.up(schema);
        }
    }
}
