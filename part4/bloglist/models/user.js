const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: async function(value) {
                const user = await this.constructor.findOne({ username: value })
                if (user) {
                    return user._id.equals(this._id)
                }
                return true
            },
            message: props => `username: "${props.value}" already used.`
        },
        minLength: 3
    },
    name: {
        type: String
    },
    passwordHash: {
        type: String,
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
