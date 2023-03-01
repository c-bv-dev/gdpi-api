import sequelize from '@/config/db';
import { IRole } from '@custom-types/custom-types';
import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

interface IUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IRole;
};

interface IUserModel extends Model<IUserAttributes> {
    checkPassword: (password: string) => Promise<boolean>;
};

const User = sequelize.define<IUserModel>('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 50]
        },
        set(value: string): void {
            const salt: string = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    role: { type: DataTypes.ENUM<IRole>('user', 'admin'), defaultValue: 'user' }
}, {
    timestamps: true
});

User.prototype.checkPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default User;