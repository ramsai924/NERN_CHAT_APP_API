import mongoose from 'mongoose'
import CONSTANTS from './Constants'

mongoose.set('strictQuery', true)
mongoose.connect(CONSTANTS.dbURL).then((connection: any) => {
    console.log(`connected to DB`)
}).catch((err: any) => {
    console.log('Something went wrong while connecting to DB')
})