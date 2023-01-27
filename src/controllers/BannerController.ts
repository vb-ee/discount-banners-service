import { Request, Response } from 'express'
import { asyncWrapper } from '../middleware'
import { Banner, IBanner } from '../models/Banner'
import { generateImageUrl, messageBroker } from '../utils'

export const getBanners = asyncWrapper(async (req: Request, res: Response) => {
    const banners = await Banner.find()
    res.status(200).json({ banners })
})

export const createBanner = asyncWrapper(
    async (req: Request, res: Response) => {
        const { title } = req.body
        const { file } = req

        if (!file)
            return res
                .status(400)
                .send({ errors: 'image file has to be defined in req' })

        const imageUrl = generateImageUrl(file.filename)
        const banner = await Banner.create({ title, imageUrl })

        res.status(201).json({ banner })
    }
)

export const getBannerById = asyncWrapper(
    async (req: Request, res: Response) => {
        const { bannerId } = req.params

        const banner = await Banner.findById(bannerId)
        if (!banner)
            return res
                .status(404)
                .send({ errors: `Banner with id ${bannerId} not found` })

        res.status(200).json({ banner })
    }
)

export const updateBannerById = asyncWrapper(
    async (req: Request, res: Response) => {
        const { bannerId } = req.params
        const { title } = req.body
        const { file } = req
        let bannerUpdateBody: IBanner

        let banner = await Banner.findById(bannerId)
        if (!banner)
            return res
                .status(404)
                .send({ errors: `Banner with id ${bannerId} not found` })

        if (file) {
            await messageBroker(banner.imageUrl, 'deleteImage')
            const imageUrl = generateImageUrl(file.filename)
            bannerUpdateBody = { title: banner.title, imageUrl }
        } else bannerUpdateBody = { title, imageUrl: banner.imageUrl }

        banner = await banner.updateOne(bannerUpdateBody)

        res.status(201).json({ banner })
    }
)

export const deleteBannerById = asyncWrapper(
    async (req: Request, res: Response) => {
        const { bannerId } = req.params

        const banner = await Banner.findById(bannerId)
        if (!banner)
            return res
                .status(404)
                .send({ errors: `Banner with id ${bannerId} not found` })

        await messageBroker(banner.imageUrl, 'deleteImage')
        await banner.delete()

        res.status(204).end()
    }
)
