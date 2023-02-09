import conversationervices from '../services/conversations.service'
const conversationervice = new conversationervices()

class conversationController {
    createConversation = async (req: any, res: any) => {
        try {
            const { users, name, type } = req.body;

            if(name === ""){
                return res.status(200).json({ success: false, data: null, message: 'Group name should not be empty' })
            }

            if(type === undefined){
                return res.status(200).json({ success: false, data: null, message: 'Please provide type of conversation' })
            }

            if (type === "PRIVATE" && users.length < 2){
                return res.status(200).json({ success: false, data: null, message: 'Private chat users to have two users' })
            }

            if(type === "GROUP"){
                const findExistingName = await conversationervice.checkConversation({ name: name })
                if (findExistingName){
                    return res.status(200).json({ success: false, data: null, message: `Already group name exits with name : ${name}` })
                }
            }

            if(type === "PRIVATE"){
                const checkAlreadyexitsConversation = await conversationervice.checkUsersConversationALreadyExits(req.body)

                if (checkAlreadyexitsConversation.length > 0) {
                    return res.status(200).json({ success: false, data: checkAlreadyexitsConversation[0], message: `Conversation already exits` })
                }
            }

            const conversationData: any = await conversationervice.createConversation(req.body)

            if (conversationData){
                const users: any = conversationData?.users;
                users.forEach((user: any) => {
                    const socket = req.app.get("socketio");
                    socket.emit(`new_conversation_${user}`)
                })
            }

            res.status(201).json({ success: true, data: conversationData, message: 'conversation created' })
            
        } catch (err: any) {
            console.log(err)
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }
}

export default conversationController;