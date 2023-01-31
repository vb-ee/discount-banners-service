import express from 'express'
import { postValidator, putValidator, uploadImage } from '../middleware'
import {
    deleteBannerById,
    createBanner,
    getBannerById,
    getBanners,
    updateBannerById
} from './BannerController'
import { authHandler, restrictToAdmin, Tokens } from '@payhasly-discount/common'

const router = express.Router()

router
    .route('/banners')
    .get(getBanners)
    .post(
        authHandler(Tokens.accessToken, 'JWT_ACCESS'),
        restrictToAdmin(),
        uploadImage.single('banner'),
        postValidator(['title']),
        createBanner
    )
router
    .route('/banners/:bannerId')
    .get(getBannerById)
    .put(
        authHandler(Tokens.accessToken, 'JWT_ACCESS'),
        restrictToAdmin(),
        uploadImage.single('banner'),
        putValidator(),
        updateBannerById
    )
    .delete(
        authHandler(Tokens.accessToken, 'JWT_ACCESS'),
        restrictToAdmin(),
        deleteBannerById
    )

export = router
