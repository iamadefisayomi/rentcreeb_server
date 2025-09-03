import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import getAuth from "../auth";



export default async function authenticate (req: Request, res: Response, next: NextFunction) {
    try {
         const auth = await getAuth()
        const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
        });
        
        if (!session) throw new Error('invalid request')
            // 
        req.user = session.user
        req.session = session.session
        next()
    }
    catch(err: any) {
        res.send({
            success: false,
            message: err.message
        })
    }
}