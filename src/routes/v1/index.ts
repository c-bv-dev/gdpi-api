import express from 'express';
import config from '@config/config';
import authRoute from './auth.route';
import docsRoute from './docs.route';
import userRoute from './user.route';
import companyRoute from './company.route';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/company',
        route: companyRoute
    }
];

const devRoutes = [
    {
        path: '/docs',
        route: docsRoute
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

config.env === 'development' && devRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;