import { IUserModel } from '@/models/user.model';
import { userService } from '@services';
import ApiError from '@utils/ApiError';
import httpStatus from 'http-status';

const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<any> => {
    const user = await userService.getUserByEmailWithPassword(email) as IUserModel;
    if (!user || !(await user.checkPassword(password))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    return user.noPassword();
};

export default {
    loginUserWithEmailAndPassword,
};