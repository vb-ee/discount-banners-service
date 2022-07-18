import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

const port = 7072

export const startApp = () => {
    const app = express()

    app.use(bodyParser.json())
    app.use(cors())

    app.listen(port, '0.0.0.0', () => {
        console.info(`Banners service listening on port ${port}`)
    })
}
