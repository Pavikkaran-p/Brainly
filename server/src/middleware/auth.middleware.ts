import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from '../config/AppConfiguration';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers["authorization"]
        const decodedToken = jwt.verify(header as string, JWT_SECRET)
        if(decodedToken){
            console.log(decodedToken)
            // @ts-ignore
            req.userId = decodedToken.id
            next()
        }
    } catch (error) {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}