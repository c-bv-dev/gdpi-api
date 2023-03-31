import sequelize from '@/config/db';
import { IRole, ILevel } from '@custom-types/custom-types';
import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';
import db from './index';

export interface IUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IRole;
    level?: ILevel;
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
    },
    level: {
        type: DataTypes.ENUM<ILevel>('1', '2', '3'),
        defaultValue: '1'
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
    },
    hooks: {
        // save in table logs the timestamps when a user is deleted
        beforeDestroy: async (user: IUserModel): Promise<void> => {
            const { firstName, lastName, email, role, level } = user.noPassword();
            console.log('🚩', firstName);
            await db.Log.create({
                message: `User ${firstName} ${lastName} with email ${email} and role ${role} and level ${level} was deleted`
            });
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