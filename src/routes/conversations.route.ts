import conversationController from "../controllers/conversations.controller"
const converstaionControllers = new conversationController()

export default function conversationRoutes(app: any) {
    app.route('/get-user-conversations/:id').get(converstaionControllers.getUserConversationList)
    app.route('/get-conversation-data/:conversationId').get(converstaionControllers.getConversationData)
    app.route('/create-conversation').post(converstaionControllers.createConversation)
}