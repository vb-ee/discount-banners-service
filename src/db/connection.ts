import { connect } from 'mongoose'
import { accessEnv } from '@payhasly-discount/common'

export const initConnection = async () => {
    await connect(accessEnv('MONGO_DB_URI'))
}
