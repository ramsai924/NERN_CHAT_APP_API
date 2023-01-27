import messageServices from '../services/messages.service'
import conversataionServices from '../services/conversations.service';
const messageService = new messageServices()
const conversationService = new conversataionServices()

class messagesController{
    createMessage = async (req: any, res: any) => {
        try {
            const { userId,conversationId, content } = req.body;
            if(userId === "" || userId === null){
                return res.status(200).json({ success: false, data: null, message: 'User ID should not be empty'})
            }

            if (conversationId === "" || conversationId === null) {
                return res.status(200).json({ success: false, data: null, message: 'conversation ID should not be empty' })
            }

            if(content === ""){
                return res.status(200).json({ success: false, data: null, message: 'Message content should not be empty' })
            }

            const messageData: any = await messageService.createMessage(req.body);
            if (messageData){
                const socket = req.app.get("socketio");
                socket.emit("new_message", { data: messageData })
                conversationService.updateTopMessageinConversation(messageData._id, conversationId).then((data: any) => {
                    console.log('conversation updated')
                }).catch((err: any) => {
                    console.log('error updating conversation')
                })
            }

            res.status(201).json({ success: true, data: messageData, message: 'Message created'})
        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    getMessagedByConversationId = async (req: any, res: any) => {
        try {
            const { conversationId } = req.params;
            const getMeesagesData: any = await messageService.getMessagesByConversation(conversationId);
            res.status(200).json({ success: true, data: getMeesagesData, message: 'success' })
        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    deleteMessage = () => {

    }
}

export default messagesController;