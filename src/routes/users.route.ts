import userController from '../controllers/users.controller'
const userControllers = new userController()

export default function userRoutes(app: any){
    app.route('/get-user-data').post(userControllers.getUserData)
    app.route('/check-user-status').post(userControllers.createUser)
    app.route('/get-user-details/:id').get(userControllers.getUserById)
    app.route('/get-users').get(userControllers.getUsers)
    app.route('/delete-user/:id').get(userControllers.createUser)
    app.route('/create-password').post(userControllers.createPassword)
    app.route('/get-user-conversations/:id').get(userControllers.getUserConversationList)
    app.route('/search-user-list').get(userControllers.getUserList)
}