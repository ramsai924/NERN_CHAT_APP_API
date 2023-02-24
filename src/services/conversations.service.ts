import mongoose from "mongoose";
import conversationModel from "../models/conversations.model";
import userconversationModel from "../models/userConversations.model";

class conversataionServices {
    createConversation = async (conversationData: any) => {
        try {
            const conversationDataCreated: any = await conversationModel.create(conversationData)
            if (conversationDataCreated) {
                await userconversationModel.updateMany({
                    user: { $in: conversationData.users },
                }, {
                    $push: { conversations: conversationDataCreated._id }
                })
            }
            return conversationDataCreated
        } catch (err: any) {
            throw err;
        }
    }

    checkUsersConversationALreadyExits = async (conversationData: any) => {
        try {
            if (conversationData.type === 'PRIVATE'){
                const checkAlreadyexitsConversation = await conversationModel.find({
                    type: 'PRIVATE',
                    $and: [
                        {
                            "users": {
                                $all: conversationData.users
                            }
                        },
                    ]
                })
                console.log('checkAlreadyexitsConversation', checkAlreadyexitsConversation)
                return checkAlreadyexitsConversation
            }else{
                return []
            }
            // const checkAlreadyexitsConversation = await conversationModel.findOne({ users: { $in: conversationData.users } })
            
        } catch (err: any) {
            throw err;
        }
    }

    updateConversationCreatedByUser = async (userId: any, conversationId: any, users: any) => {
        try {
            const checkAlreadyexitsCreatedByuser: any = await conversationModel.find({
                $and: [
                    {
                        "createdBy": {
                            $all: users
                        }
                    },
                ]
            })
            // console.log('checkAlreadyexitsCreatedByuser', checkAlreadyexitsCreatedByuser)
            if (checkAlreadyexitsCreatedByuser.length > 0){
                return checkAlreadyexitsCreatedByuser;
            }
            const updateConversation: any = await conversationModel.updateOne({ _id: conversationId }, { $push: { createdBy: new mongoose.Types.ObjectId(userId) } }, { new: true })
            // console.log('up', updateConversation)
            return updateConversation;
        } catch (err: any) {
            throw err;
        }
    }

    checkConversation = async (conversation: any) => {
        try {
            const findConversation: any = await conversationModel.findOne({ ...conversation });
            return findConversation;
        } catch (err: any) {
            throw err;
        }
    }

    updateTopMessageinConversation = async (topChatId: any, conversationId: any) => {
        try {
            const updateConversation: any = await conversationModel.findByIdAndUpdate({ _id: conversationId }, { $set: { topChat: topChatId } }, { new: true })
            return updateConversation;
        } catch (err: any) {
            throw err;
        }
    }

    getConversationList = async (id: any) => {
        try {
            const findUserConversation: any = await userconversationModel.findOne({ user: id })
                .populate([{ path: 'conversations', model: 'conversation', options: { sort: { updatedAt: -1 } }, populate: [{ path: 'createdBy', model: 'user' }, { path: 'users', model: 'user' }, { path: 'topChat', model: 'message' }] }]);

            return findUserConversation;
        } catch (err: any) {
            throw err;
        }
    }

    getConversationData = async (id: any) => {
        try {
            const findConversation: any = await conversationModel.findOne({ _id: id }).populate({ path :'users', model: 'user'});
            return findConversation;
        } catch (err: any) {
            throw err;
        }
    }
}

export default conversataionServices;