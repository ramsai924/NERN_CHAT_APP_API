import userController from '../controllers/users.controller'
const userControllers = new userController()

export default function userRoutes(app: any){
    app.route('/create-user').post(userControllers.createUser)
    app.route('/get-user-details/:id').get(userControllers.getUserById)
    app.route('/get-users').get(userControllers.getUsers)
    app.route('/delete-user/:id').get(userControllers.createUser)
    app.route('/create-password').post(userControllers.createPassword)
}