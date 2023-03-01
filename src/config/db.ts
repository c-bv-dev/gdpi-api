import config from '@config/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.database.name, config.database.user, config.database.pass, {
    host: config.database.host,
    port: config.database.port as number,
    dialect: 'postgres'
});

export default sequelize;