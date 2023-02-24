import messagesModel from "../models/messages.model";

class messagesServices {
   createMessage = async (messageData: any) => {
    try {
        const createMessage: any = await messagesModel.create(messageData);
        return createMessage;
    } catch (err: any) {
        throw err;
    }
   }

   getMessagesByConversation = async (conversationId: any) => {
    try {
        const messages: any = await messagesModel.find({ conversationId: conversationId })
        return messages;
    } catch (err: any) {
        throw err;
    }
   }

   deleteMessage = () => {

   }
}

export default messagesServices;