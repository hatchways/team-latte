const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profilePic: {
        key: {
            type: String,
        },
        link: {
            type: String,
        }
    },
    location: {
        type: String
    },
    expertise: [{
        type: String
    }],
    description: {
        type: String
    },
    avgCheque:{
        type: Number
    },
    linkedIn: {
        type: String
    },
    angelList: {
        type: String
    },
})

userSchema.virtual('User', {
    ref: 'User',
    localField: '_id',
    foreignField: '_id'
})

const Profile = mongoose.model('Profile',profileSchema)

module.exports = Profile