const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const coffeeSchema = new Schema ({
    image:{
        type: String,

    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    temp: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }


    }, {timestamps:true}
)

module.exports = mongoose.model ('Coffee', coffeeSchema)