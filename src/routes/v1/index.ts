import config from '@config/config';
import express from 'express';
import authRoute from './auth.route';
import consumerRoute from './consumer.route';
import ticketRoute from './ticket.route';
import docsRoute from './docs.route';
import userRoute from './user.route';

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
        path: '/consumer',
        route: consumerRoute
    },
    {
        path: '/ticket',
        route: ticketRoute
    },
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