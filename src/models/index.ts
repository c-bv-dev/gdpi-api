import sequelize from '@/config/db';
import Asset from './asset.model';
import Consumer from './consumer.model';
import Ticket from './ticket.model';
import User from './user.model';
import Log from './log.model';

let db: any = {};
db.User = User;
db.Consumer = Consumer;
db.Asset = Asset;
db.Ticket = Ticket;
db.Log = Log;

// Associations
db.Consumer.hasMany(db.Asset);
db.Asset.belongsTo(db.Consumer);

db.Asset.hasMany(db.Ticket);
db.Ticket.belongsTo(db.Asset);

db.Consumer.hasMany(db.Ticket);
db.Ticket.belongsTo(db.Consumer);


db.sequelize = sequelize;

export default db;