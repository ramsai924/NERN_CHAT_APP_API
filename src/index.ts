import express from 'express'
import './config/DBConfig'
import bodyParser from 'body-parser';
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import * as http from 'http'
import * as socket from 'socket.io'
import userRoutes from './routes/users.route';
import messageRoutes from './routes/messages.route';
import conversationRoutes from './routes/conversations.route';
import globalSocket from './sockets/index';

const app: any = express();

//request body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '100mb',extended: true }))
app.use(cors())
//other configurations
app.use(express.static(path.join(__dirname,'assets')))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//routes
userRoutes(app)
messageRoutes(app)
conversationRoutes(app)

//error handling
app.use(function(req: any, res: any, next: any){
    next()
})

//socket connection
const server = http.createServer(app)
const io = new socket.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
    }
})
app.set("socketio", io)
io.on("connection", (socket: any) => {
    // console.log('socket connection accquired')
    globalSocket(socket)
})

//port
const PORT = 3030
server.listen(PORT,() => {
    console.log(`Listening to port : ${PORT}`)
})
