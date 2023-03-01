import sequelize from '@/config/db';
import User from './user.model';

let db: any = {};
db.user = User;

db.sequelize = sequelize;

export default db;