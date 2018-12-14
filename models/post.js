const mongoose = require('mongoose')
const schema = mongoose.schema

const postSchema = {

    charityName: String,
    name: String,
    amountGiven: String,
    description: String
}

module.exports = mongoose.model('Post', postSchema)