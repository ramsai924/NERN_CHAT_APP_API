import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        conversationId: {
            type: mongoose.Types.ObjectId,
            ref: 'conversation'
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

const messagesModel = mongoose.model('message', messagesSchema)
export default messagesModel