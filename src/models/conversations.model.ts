import mongoose from 'mongoose'

function arrayLimit(val: any) {
    return val.length <= 10;
}

const conversationSchema = new mongoose.Schema(
    {
        users: {
            type: [{
                type: mongoose.Types.ObjectId,
                ref: 'user'
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 10']
        },
        name: {
            type: String
        },
        type: {
            type: String,
            default: 'PRIVATE'
        },
        topChat: {
            type: mongoose.Types.ObjectId,
            ref: 'message',
            default: null
        },
        createdBy:{
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        archive: {
            type: Boolean,
            default: false
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

const conversationModel = mongoose.model('conversation', conversationSchema)
export default conversationModel