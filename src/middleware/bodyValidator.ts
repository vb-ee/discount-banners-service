import { NextFunction, Request, Response } from 'express'

export const postValidator = (keys: string[]) => {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body || !req.file)
            return res.status(422).send({ errors: 'Invalid request' })

        keys.forEach((key) => {
            if (!(key in req.body))
                return res
                    .status(400)
                    .send({ errors: `${key} has to be defined` })
        })

        next()
    }
}

export const putValidator = () => {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body && !req.file && req.method == 'PUT')
            return res.status(422).send({ errors: 'Invalid request' })
        next()
    }
}
