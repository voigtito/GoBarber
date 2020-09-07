import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    // Token Validation
    const authHeader = request.headers.authorization;

    if (!authHeader){
        throw new AppError('JWT Token is missing', 401)
    };

    const [, token] = authHeader.split(' ');

    try{       
        const decodedToken = verify(token, authConfig.jwt.secret);

        // force decodedToken to the var
        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub,
        };

        // Next is a function that allows the user to go to the next step
        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401)
    }
}