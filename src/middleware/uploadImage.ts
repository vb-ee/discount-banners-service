import multer from 'multer'
import { Request } from 'express'
import sftpStorage from 'multer-sftp'

const storage = sftpStorage({
    sftp: {
        host: 'image-delivery-service',
        port: 22,
        username: 'node',
        password: 'node'
    },
    destination: function (req, file, cb) {
        cb(null, '/app/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

export const uploadImage = multer({
    storage,
    fileFilter(req: Request, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
            callback(new Error('Not acceptable file type'))
        callback(null, true)
    }
})
