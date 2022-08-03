import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { errorHandler } from './middleware/errorHandler'

const port = 7072

export const startApp = () => {
    const app = express()

    app.use(bodyParser.json())
    app.use(cors())

    app.use(require('./controllers/routes'))

    app.use(errorHandler)

    app.listen(port, '0.0.0.0', () => {
        console.info(`Banners service listening on port ${port}`)
    })
}
