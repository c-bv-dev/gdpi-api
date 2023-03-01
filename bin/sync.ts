import database from '../src/config/db';

const sync = async () => {
    try {
        await database.sync({ alter: true })
        console.log('Database synced')

    } catch (error) {
        console.error(error)
    };
};

sync();