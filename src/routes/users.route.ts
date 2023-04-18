import userController from '../controllers/users.controller'
const userControllers = new userController()

export default function userRoutes(app: any){
    app.route('/get-user-data').post(userControllers.getUserData)
    app.route('/signup-user').post(userControllers.createUser)
    app.route('/signin-user').post(userControllers.loginUser)
    app.route('/get-user-details/:id').get(userControllers.getUserById)
    app.route('/get-users').get(userControllers.getUsers)
    app.route('/delete-user/:id').get(userControllers.createUser)
    app.route('/create-password').post(userControllers.createPassword)
    app.route('/search-user-list').get(userControllers.getUserList)
    app.route('/test-status').get(userControllers.statusCode)
    
}