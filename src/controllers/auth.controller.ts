import { authService, tokenService } from '@services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string, password: string };
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = tokenService.generateAuthToken(user);
    res.status(httpStatus.OK).send({ ...user, token });
};

export default {
    login,
};