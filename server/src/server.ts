import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './shared/routes'
import uploadConfig from './config/upload';
import './shared/database'
import AppError from './shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
// This is to visualize the files from images
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err)
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
});

app.listen(3333, () => {
    console.log('server started on port 3333')
});

