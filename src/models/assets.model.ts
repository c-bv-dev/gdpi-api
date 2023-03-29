import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export interface IAssetsAttributes {
    name: string;
    description: string;
    serialNumber: string;
    assetNumber: string;
    purchaseDate: Date;
    purchasePrice: number;
};

export interface IAssetsModel extends Model<IAssetsAttributes>, IAssetsAttributes { };

const Assets = sequelize.define<IAssetsModel>('Assets', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assetNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    purchasePrice: {
        type: DataTypes.DECIMAL(10, 2),
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

export default Assets;