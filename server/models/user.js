const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 6){
                throw new Error("password length too short")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

userSchema.virtual('Projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.generateAuthToken = async function () {
    console.log('hello')
    const token = jwt.sign({_id: this.id.toString()},process.env.JWT_SECRET)

    this.tokens = this.tokens.concat({ token })
    await this.save()
    
    return token
}

userSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.__v

    return userObject
}

userSchema.statics.checkCredentials = async(email, password) =>{
    const user = await User.findOne({email})
    console.log(email)
    if(!user){
        throw new Error('Login credentials are incorrect.')
    }
    const pCompare = await bcrypt.compare(password, user.password)
    if(pCompare){
        console.log(user)
        return user
    }else {
        throw new Error('Login credentials are incorrect.')
    }

}

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
