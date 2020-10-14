import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error);

    return res.status(500).json({ message: 'Internal server error.' });
}

export default errorHandler;
