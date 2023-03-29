import sequelize from '@/config/db';
import Assets from './assets.model';
import Company from './company.model';
import User from './user.model';

let db: any = {};
db.User = User;
db.Company = Company;
db.Assets = Assets;

// Associations
db.Company.hasMany(db.Assets);
db.Assets.belongsTo(db.Company);

db.sequelize = sequelize;

export default db;