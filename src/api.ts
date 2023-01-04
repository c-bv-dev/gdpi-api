import express from 'express';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE'
    );
    next();
});
app.use(cors());

// ROUTES
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('API is online');
});

app.use('/auth', require('./routes/auth'));

app.use('*', (req: Request, res: Response) => {
    res.status(404).send('Route not found');
});

module.exports = app;