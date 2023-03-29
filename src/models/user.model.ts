import sequelize from '@/config/db';
import { IRole } from '@custom-types/custom-types';
import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

export interface IUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IRole;
};

export interface IUserModel extends Model<IUserAttributes>, IUserAttributes {
    checkPassword: (password: string) => Promise<boolean>;
    noPassword: () => IUserAttributes;
};

const User = sequelize.define<IUserModel>('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'email',
            msg: 'Email address already in use!'
        },
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 128]
        },
        set(value: string): void {
            const salt: string = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    role: {
        type: DataTypes.ENUM<IRole>('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        }
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ['password'],
                exclude: ['createdAt', 'updatedAt']
            }
        },
        withTimestamps: {
            attributes: {
                include: ['createdAt', 'updatedAt']
            }
        }
    }
});

User.prototype.checkPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

User.prototype.noPassword = function (): IUserAttributes {
    return { ...this.get(), password: undefined };
};

export default User;