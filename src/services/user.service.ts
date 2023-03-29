import User, { IUserModel } from '@/models/user.model';
import ApiError from '@/utils/ApiError';
import httpStatus from 'http-status';

const createUser = async (userData: IUserModel): Promise<IUserModel> => {
    return await User.create(userData);
};

const getUserByEmail = async (email: string): Promise<IUserModel | null> => {
    return await User.findOne({ where: { email } });
};

const getUserByEmailWithPassword = async (email: string): Promise<IUserModel | null> => {
    return await User.scope('withPassword').findOne({ where: { email } });
};

const queryUsers = async (filter: object): Promise<IUserModel[]> => {
    return await User.findAll(filter);
};

const getUserById = async (id: string): Promise<IUserModel | null> => {
    return await User.findByPk(id);
};

const updateUserById = async (id: string, updateBody: any): Promise<IUserModel> => {
    const user = await getUserById(id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (id: string): Promise<void> => {
    const user = await getUserById(id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    return await user.destroy();
};

export default {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByEmailWithPassword,
    queryUsers,
    updateUserById,
    deleteUserById
};