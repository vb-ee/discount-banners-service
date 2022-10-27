import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { errorHandler } from './middleware/errorHandler'

export const startApp = () => {
    const app = express()
    const port = 8080

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/banner-images', express.static('images'))

    app.use(require('./controllers/routes'))

    app.use(errorHandler)

    app.listen(port, '0.0.0.0', () => {
        console.info(`Banners service listening on port ${port}`)
    })
}
