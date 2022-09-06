import { initConnection } from './db/connection'
import { startApp } from './startApp'

initConnection('mongodb://banners-service-db/bannersdb')
    .then(() => {
        startApp()
    })
    .catch((err) => console.log(err))
