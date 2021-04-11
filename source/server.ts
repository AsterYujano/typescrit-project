import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';

const NAMESPACE = 'Server';
const router = express();

// Parse the request
express.urlencoded({ extended: false });
express.json();

// Log the request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}, IP - [${req.socket.remoteAddress}]]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}, IP - [${req.socket.remoteAddress}]], STATUS - [${res.statusCode}]`);
    });

    next();
});

// Rules
router.use((req, res, next) => {
    // TODO in prodcution put real IP address
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// Routes
router.use(sampleRoutes);

// Error handling
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

// create server

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
