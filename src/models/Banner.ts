import { Schema, model } from 'mongoose'
// Create an interface representing a document in MongoDB.
export interface IBanner {
    title: string
    imageUrl: string
}

// Create a Schema corresponding to the document interfaces.
export const bannerSchema = new Schema<IBanner>(
    {
        title: { type: String, required: true },
        imageUrl: { type: String, required: true }
    },
    {
        toJSON: {
            versionKey: false,
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    }
)

// Create a Model.
export const Banner = model<IBanner>('Banner', bannerSchema)
