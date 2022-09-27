import { initConnection } from './db/connection'
import { startApp } from './startApp'

initConnection()
    .then(() => {
        startApp()
    })
    .catch((err) => console.log(err))
