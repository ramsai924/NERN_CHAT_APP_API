import userService from '../services/users.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userServices = new userService()

class userControllers{
    getUserData = async (req: any, res: any) => {
        try {
            const { email } = req.body;

            if (email === '' || email === undefined) {
                return res.status(204).json({ success: false, data: null, message: 'email should not be empty' })
            }
            const userData = await userServices.checkUserData({ email: email })
    
            if (userData) {
                res.status(200).json({ success: true, data: userData, message: 'User data found successfully' })
            }else{
                res.status(200).json({ success: false, data: null, message: 'User data null' })
            }
        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }
    
    createUser = async (req: any, res: any) => {
        try {
            const { email, password, firstName, lastName } = req.body;
            
            if (email === '' || email === undefined) {
                return res.status(200).json({ success: false, data: null, message: 'Email should not be empty' })
            }

            // if(mobile.length < 10 || mobile.length > 10){
            //     return res.status(200).json({ success: false, data: null, message: 'Phone number should greater than or equal to 10 characters' })
            // }

            if (firstName === "" || firstName === undefined){
                return res.status(200).json({ success: false, data: null, message: 'First Name should not be empty' })
            }

            if (password === '' || password === undefined) {
                return res.status(200).json({ success: false, data: null, message: 'Password should not be empty' })
            }

            if(password.length < 6){
                return res.status(200).json({ success: false, data: null, message: 'Password should be grater than 6 characters' })
            }

            const userExits = await userServices.checkUserData({ email: email })
            if (userExits !== null){
                return res.status(200).json({ success: false, data: null, message: 'User already exits with details provided' })
            }

            const userData: any = await userServices.createUser(req.body);
            userData.password = await bcrypt.hash(password, 10)

            if (userData){
                const userObj = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    avatar: userData.avatar
                }
                const refreshToken: any = await jwt.sign(userObj, 'CHATAPP', { expiresIn: '60d' })
                const AccessToken: any = await jwt.sign(userObj, 'CHATAPP', { expiresIn: '30d' })

                let responseUserData = {
                    token : {
                        refreshToken: refreshToken,
                        accessToken: AccessToken
                    },
                    user: userObj
                }
                res.status(200).json({ success: true, data: responseUserData, message: 'User created successfully' })
            }
        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    getUserById = async (req: any, res: any) => {
        try {
            const { id } = req.params;

            const userDetails = await userServices.getUserDetails(id)
            if (userDetails === null){
                return res.status(200).json({ success: false, data: null, message: `user details not found by ID : ${id}`})
            }

            res.status(200).json({ success: true, data: userDetails, message: 'User details found' })
        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    getUsers = async (req: any, res: any) => {
        try {
            // const io = req.app.get("socketio");
            // io.emit('user_online_1', { userStatus: false })
            const usersDetails: any = await userServices.getAllUsers()
            if (usersDetails.length === 0) {
                return res.status(200).json({ success: false, data: null, message: `No users found` })
            }

            res.status(200).json({ success: true, data: usersDetails, message: 'Users details found' })
        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    deleteUserById = (req: any, res: any) => {

    }

    createPassword = async (req: any, res: any) => {
        try {
            const { userId, password } = req.body;

            if(password === ""){
                return res.status(200).json({ success: false, data: null, message: `Password should not be empty` })
            }

            if (password.length < 6) {
                return res.status(200).json({ success: false, data: null, message: `Password should be less than 6 characters` })
            }

            const userDetails: any = await userServices.getUserDetails(userId)
            if (userDetails === null) {
                return res.status(200).json({ success: false, data: null, message: `No user found` })
            }

            const saltRounds = 10;
            const hashPasword = await bcrypt.hash(password, saltRounds)

            const userPasswordUpdate = await userServices.createPassword(userId, hashPasword)
            res.status(200).json({ success: true, data: userPasswordUpdate, message: 'User password updated' })
        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }

    getUserConversationList = async (req: any, res: any) => {
        try {
            const getUser: any = await userServices.getConversationList(req.params.id)
            res.status(200).json({ success: true, data: getUser, message: 'Users conversation found' })

        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message }) 
        }
    }

    getUserList = async (req: any, res: any) => {
        try {
            const { qs } = req.query;
           console.log(qs)
            const getUserlistData: any = await userServices.getUserListRegex(qs)
            res.status(200).json({ success: true, data: getUserlistData, message: 'Success' })

        } catch (err: any) {
            res.status(500).json({ success: false, data: null, message: err?.message })
        }
    }
}

export default userControllers;