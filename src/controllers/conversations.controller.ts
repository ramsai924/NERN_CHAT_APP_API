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

            // if(type === "GROUP"){
            //     const findExistingName = await conversationervice.checkConversation({ name: name })
            //     if (findExistingName){
            //         return res.status(200).json({ success: false, data: null, message: `Already group name exits with name : ${name}` })
            //     }
            // }

            if(type === "PRIVATE"){
                const checkAlreadyexitsConversation: any = await conversationervice.checkUsersConversationALreadyExits(req.body)
               
                if (checkAlreadyexitsConversation.length > 0 && type === 'PRIVATE') {
                    await conversationervice.updateConversationCreatedByUser(req.body.createdBy, checkAlreadyexitsConversation[0]._id, checkAlreadyexitsConversation[0].users )
                    return res.status(200).json({ success: false, data: checkAlreadyexitsConversation[0], message: `Conversation already exits` })
                }
            }

            const conversationData: any = await conversationervice.createConversation(req.body)

            if (conversationData){
                const users: any = conversationData?.users;
                users.forEach((user: any) => {
                    const socket = req.app.get("socketio");
                    socket.emit(`new_conversation_update_${user}`, { render: (type === 'GROUP' || (type === 'PRIVATE' && conversationData?.topChat !== null) ? true : false)  })
                })
            }

            res.status(201).json({ success: true, data: conversationData, message: 'conversation created' })
            
        } catch (err: any) {
            console.log(err)
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    getUserConversationList = async (req: any, res: any) => {
        try {
            // console.log('cookies____', req.headers.cookie)
            const getUser: any = await conversationervice.getConversationList(req.params.id)
            res.status(200).json({ success: true, data: getUser, message: 'Users conversation found' })

        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    getUserConversations = async (req: any, res: any) => {
        try {
            console.log('cookies____', req.query)
            // const getUser: any = await conversationervice.getConversationList(req.params.id)
            res.status(200).json({ success: true, data: null, message: 'Users conversation found' })

        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    getConversationData = async (req: any, res: any) => {
        try {
            const getUserConversation: any = await conversationervice.getConversationData(req.params.conversationId)
            res.status(200).json({ success: true, data: getUserConversation, message: 'User conversation data found' })

        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }
}

export default conversationController;