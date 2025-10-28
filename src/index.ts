import { Logger } from './libraries/logger';
import { User } from './models/user';
import { Migrations } from './libraries/migrations';

const logger = new Logger('./src/index.ts');

async function main(): Promise<void> {
    await Migrations.setup();

    const newUser: User = await User.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        active: true,
        lastLogin: new Date(),
    });
    logger.debug('user created', newUser);

    const users = await User.findAll();
    logger.debug('users found', users);

    const user: User = await User.find('1');
    user.name.set('Jane Doe');

    await user.save();
    logger.debug('user updated', user);

    await user.delete();
    logger.debug('user deleted', user);
}

main().catch(console.error);
