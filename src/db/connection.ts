import { connect } from 'mongoose'

export const initConnection = async () => {
    await connect('mongodb://banners-service-db/banners')
}
