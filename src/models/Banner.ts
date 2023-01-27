import { Schema, model } from 'mongoose'
import { messageBroker } from '../utils'
// Create an interface representing a document in MongoDB.
export interface IBanner {
    title: string
    imageUrl: string
}

// Create a Schema corresponding to the document interfaces.
export const bannerSchema = new Schema<IBanner>({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true }
})

// Create a Model.
export const Banner = model<IBanner>('Banner', bannerSchema)
