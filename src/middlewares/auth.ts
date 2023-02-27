import { IRole } from '@custom-types/custom-types';
import ApiError from '@utils/ApiError';
import { NextFunction, Request, Response } from 'express';

export interface IRequest extends Request {
    user?: any;
}

const verifyRole = (role: IRole) => {
    return (req: IRequest, res: Response, next: NextFunction) => {
        if (req.user.role !== role) throw new ApiError(403, 'Forbidden');
        next();
    };
};

export default {
    verifyRole,
};