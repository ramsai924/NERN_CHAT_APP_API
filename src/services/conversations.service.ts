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
            // const checkAlreadyexitsConversation = await conversationModel.findOne({ users: { $in: conversationData.users } })
            const checkAlreadyexitsConversation = await conversationModel.find({
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
        } catch (err: any) {
            throw err;
        }
    }
    checkConversation = async (conversationId: any) => {
        try {
            const findConversation: any = await conversationModel.findOne({ ...conversationId });
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
}

export default conversataionServices;