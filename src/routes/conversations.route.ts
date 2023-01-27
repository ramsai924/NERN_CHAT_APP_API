import conversationController from "../controllers/conversations.controller"
const converstaionControllers = new conversationController()

export default function conversationRoutes(app: any) {
    app.route('/get-user-conversations/:userId').post(converstaionControllers.createConversation)
    app.route('/create-conversation').post(converstaionControllers.createConversation)
}