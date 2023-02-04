import { accessEnv } from '@payhasly-discount/common'
import mongoose from 'mongoose'
import { Banner } from './models/Banner'

// Connect to the MongoDB database
mongoose.connect(accessEnv('MONGO_DB_URI'))

// Create an array of sample data
const banners = [
    {
        title: 'Banner 1',
        imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/b1.jpeg`
    },
    {
        title: 'Banner 2',
        imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/b2.jpeg`
    },
    {
        title: 'Banner 3',
        imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/b3.jpg`
    },
    {
        title: 'Banner 4',
        imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/b4.jpg`
    },
    {
        title: 'Banner 5',
        imageUrl: `${accessEnv('API_GATEWAY_URL')}/images/b5.jpeg`
    }
]

// Clear the existing data in the collection
Banner.deleteMany({}, (err) => {
    if (err) {
        console.error('Error clearing collection:', err)
    } else {
        console.log('Collection cleared successfully')

        // Insert the sample data into the collection
        Banner.insertMany(banners, (err, docs) => {
            if (err) {
                console.error('Error inserting data:', err)
            } else {
                console.log('Data inserted successfully:', docs)
            }

            // Close the connection to the database
            mongoose.connection.close()
        })
    }
})
