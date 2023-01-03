const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
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
app.get('/', (req, res) => {
    res.status(200).send('API is online');
});

// app.use(require('./routes/users'));

app.use('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app;