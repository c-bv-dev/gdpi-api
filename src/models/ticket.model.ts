import sequelize from '@/config/db';
import { DataTypes, Model } from 'sequelize';

export interface ITicketAttributes {
    status: string;
    title: string;
    description: string;
    date: Date;
    actions: [
        {
            date: Date;
            description: string;
            status: string;
        }
    ]
};

export interface IUserModel extends Model<ITicketAttributes>, ITicketAttributes {

};

const Ticket = sequelize.define<IUserModel>('Ticket', {
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    actions: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    }
}, {
    timestamps: true
});

export default Ticket;