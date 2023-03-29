import companyService from '@/services/company.service';
import pick from '@utils/pick';
import { Request, Response } from 'express';

// const createUser = async (req: Request, res: Response) => {
//     const user = await userService.createUser(req.body);
//     res.status(httpStatus.CREATED).send(user);
// };

const getCompanies = async (req: Request, res: Response) => {
    const filter = pick(req.query, ['firstName', 'lastName', 'email']);
    const companies = await companyService.getCompanies(filter);
    res.send(companies);
};

// const getUser = async (req: IRequest, res: Response) => {
//     const user = await userService.getUserById(req.params.id);
//     if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     res.send(user);
// };

// const updateUser = async (req: IRequest, res: Response) => {
//     const user = await userService.updateUserById(req.params.id, req.body);
//     res.send(user);
// };

// const deleteUser = async (req: IRequest, res: Response) => {
//     await userService.deleteUserById(req.params.id);
//     res.status(httpStatus.OK).send();
// };

export default {
    // createUser,
    getCompanies,
    // getUser,
    // updateUser,
    // deleteUser
};