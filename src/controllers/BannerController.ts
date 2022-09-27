import { Request, Response } from 'express'
import { asyncWrapper } from '../middleware'
import { Banner } from '../models/Banner'
import { renameImagePath } from '../utils/renameImagePath'

export const getBanners = asyncWrapper(async (req: Request, res: Response) => {
    const banners = await Banner.find()
    res.status(200).json({ banners })
})

export const createBanner = asyncWrapper(
    async (req: Request, res: Response) => {
        const { title } = req.body

        const imageUrl = `${req.file?.destination}/${req.file?.originalname}`
        renameImagePath(<string>req.file?.path, imageUrl)

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

        const banner = await Banner.findById(bannerId)
        if (!banner)
            return res
                .status(404)
                .send({ errors: `Banner with id ${bannerId} not found` })

        banner.removeImage()
        const imageUrl = `${req.file?.destination}/${req.file?.originalname}`
        renameImagePath(<string>req.file?.path, imageUrl)

        await banner.update({ title, imageUrl })

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

        banner.removeImage()
        await banner.delete()

        res.status(204).end()
    }
)
