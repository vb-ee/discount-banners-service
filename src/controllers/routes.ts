import express from 'express'
import { bodyValidator, restrictToAdmin, uploadImage } from '../middleware'
import {
    deleteBannerById,
    createBanner,
    getBannerById,
    getBanners,
    updateBannerById
} from './BannerController'

const router = express.Router()

router
    .route('/banners')
    .get(getBanners)
    .post(
        restrictToAdmin(),
        uploadImage.single('banner'),
        bodyValidator(['title']),
        createBanner
    )
router
    .route('/banners/:bannerId')
    .get(getBannerById)
    .put(
        restrictToAdmin(),
        uploadImage.single('banner'),
        bodyValidator(['title']),
        updateBannerById
    )
    .delete(restrictToAdmin(), deleteBannerById)

export = router
