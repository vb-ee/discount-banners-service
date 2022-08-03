import express from 'express'
import { bodyValidator, uploadImage } from '../middleware'
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
    .post(uploadImage.single('banner'), bodyValidator(['title']), createBanner)
router
    .route('/banners/:bannerId')
    .get(getBannerById)
    .put(
        uploadImage.single('banner'),
        bodyValidator(['title']),
        updateBannerById
    )
    .delete(deleteBannerById)

export = router
