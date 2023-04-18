import mongoose from 'mongoose'
import CONSTANTS from './Constants'
const liveUrl = 'mongodb+srv://ramsai924:nextjschatapp@cluster0.gjdphl1.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', true)
mongoose.connect(CONSTANTS.dbURL).then((connection: any) => {
// mongoose.connect(liveUrl).then((connection: any) => {
    console.log(`connected to DB`)
}).catch((err: any) => {
    console.log('Something went wrong while connecting to DB')
})