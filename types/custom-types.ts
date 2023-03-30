declare const roles: readonly ['admin', 'user'];
declare const level: readonly ['1', '2', '3'];

export type IRole = typeof roles[number];
export type ILevel = typeof level[number];

export type IUser = {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: IRole;
    level?: ILevel;
    password?: string;
};