import { connect } from 'mongoose'

export const initConnection = async () => {
    await connect('mongodb://banners-service-db:27017/banners')
}
