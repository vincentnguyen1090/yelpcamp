//seed our database
//deletes everything from database but replaces everything with new Campgrounds

const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            // YOUR USER ID
            author: '664eb51d941944bbb689e971',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Aspernatur minus hic voluptatum cumque qui rem et explicareprehenderit pariatur distinctio porro quaerat, maxime harum, consectetur possimus dolor repellendus quam temporibus.',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/duzpc7kge/image/upload/v1718831524/YelpCamp/i1oecpeo5xfuvzwtshbu.webp',
                    filename: 'YelpCamp/cdkoc8xujb9dv6va6yha',
                },
                {
                    url: 'https://res.cloudinary.com/duzpc7kge/image/upload/v1718831525/YelpCamp/jr3383byvqfmunqqn6bf.webp',
                    filename: 'YelpCamp/fbbgwogumaxu8pzuev2p',
                },
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})