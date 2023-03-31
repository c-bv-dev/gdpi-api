import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export interface ILogAttributes {
    message: string;
};

export interface ILogModel extends Model<ILogAttributes>, ILogAttributes { };

const Log = sequelize.define<ILogModel>('Log', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

export default Log;