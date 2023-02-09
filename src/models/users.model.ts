import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email ID is required']
        },
        password: {
            type: String,
        },
        firstName: {
            type: String,
            required: [true, 'First Name is required']
        },
        lastName: {
            type: String,
            required: false
        },
        mobile: {
            type: String,
            trim: true,
            // required: [true, 'Mobile number is required']
        },
        avatar: {
            type: Object,
            default: { location: '' }
        },
        lastseen: {
            type: String
        },
        deleted: {
            type: Boolean,
            default: false
        },
        inActive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model('user', userSchema)
export default userModel