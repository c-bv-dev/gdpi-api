import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export interface IAssetAttributes {
    type: string;
    brand: string;
    model: string;
    serialNumber: string;
    idNumber: string;
};

export interface IAssetModel extends Model<IAssetAttributes>, IAssetAttributes { };

const Asset = sequelize.define<IAssetModel>('Asset', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idNumber: {
        type: DataTypes.STRING,
        allowNull: false
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

export default Asset;