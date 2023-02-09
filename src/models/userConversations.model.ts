import mongoose from 'mongoose'

const userconversationSchema = new mongoose.Schema(
    {
        conversations: {
            type: [{
                type: mongoose.Types.ObjectId,
                ref: 'conversation'
            }],
            default: []
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const userconversationModel = mongoose.model('userconversation', userconversationSchema)
export default userconversationModel