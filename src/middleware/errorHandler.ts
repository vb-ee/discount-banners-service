import { NextFunction, Request, Response } from 'express'
import { MulterError } from 'multer'

interface MongoError extends Error {
    code: number
}

export const errorHandler = (
    err: MongoError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode: number

    console.log(err)

    if (err.name === 'ValidationError') statusCode = 400
    else if (err instanceof MulterError) statusCode = 400
    else if (err.code && err.code === 11000) statusCode = 409
    else statusCode = 500

    return res.status(statusCode).send({ error: err.message })
}
