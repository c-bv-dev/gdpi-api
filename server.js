const debug = require('debug');
const http = require('http');
const mongoose = require('mongoose');
const app = require('./src/api');

const normalizePort = (val) => {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
};

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    debug('Listening on ' + bind);
};

// DB connection
const db = mongoose.connection;

db.on('connecting', () => {
    console.log('Connecting to MongoDB...');
});
db.on('connected', () => {
    console.log('MongoDB connected!');
});
db.on('error', (err) => {
    console.log(err);
});
db.once('disconnected', () => {
    console.log('MongoDB disconnected!');
    setTimeout(() => {
        dbConfig.connect();
    }, 3000)
});

// dbConfig.connect();


// Define port
const port = normalizePort(process.env.PORT || 5500);
app.set('port', port);
const server = http.createServer(app);

// Run server
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
console.log(`Server running on port ${port}`);