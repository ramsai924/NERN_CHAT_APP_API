import messagesController from "../controllers/messages.controller"
const messagesControllers = new messagesController()

export default function messageRoutes(app: any) {
    app.route('/create-message').post(messagesControllers.createMessage)
    app.route('/get-messages/:conversationId').get(messagesControllers.getMessagedByConversationId)
    app.route('/delete-message/:messageId').get(messagesControllers.deleteMessage)
}