import { Schema, model, Model } from 'mongoose'
import fs from 'fs'
// Create an interface representing a document in MongoDB.
export interface IBanner {
    title: string
    imageUrl: string
}

export interface IBannerMethods {
    removeImage(): void
}

type BannerModel = Model<IBanner, {}, IBannerMethods>

// Create a Schema corresponding to the document interfaces.
export const bannerSchema = new Schema<IBanner, BannerModel, IBannerMethods>({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true }
})

bannerSchema.methods.removeImage = function () {
    fs.unlink(this.imageUrl, (err) => {
        console.log(err)
    })
}

// Create a Model.
export const Banner = model<IBanner, BannerModel>('Banner', bannerSchema)
