import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Metrics controller';

const index = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Metrics index route called');

    return res.status(200).json({
        message: 'pong'
    });
};

export default { index };
