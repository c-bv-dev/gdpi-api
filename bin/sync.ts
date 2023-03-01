import db from '@models';

const sync = async () => {
    try {
        await db.sequelize.sync({ force: true });
    } catch (error) {
        console.error(error)
    };
};

sync();