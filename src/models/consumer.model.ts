import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export interface IConsumerAttributes {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
};

export interface IConsumerModel extends Model<IConsumerAttributes>, IConsumerAttributes { };

const Consumer = sequelize.define<IConsumerModel>('Consumer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    },
    scopes: {
        withTimestamps: {
            attributes: {
                include: ['createdAt', 'updatedAt']
            }
        }
    }
});

export default Consumer;