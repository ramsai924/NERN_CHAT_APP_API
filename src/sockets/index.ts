import userModel from "../models/users.model";

const globalSocket = function(socket: any){
    
    //socket emit for user-online
    socket.on("user_online", (data: any) => {
        console.log('online', data)
        const { userID } = data;
        socket.broadcast.emit(`user_online_${userID}`, { ...data, userStatus: true, text: userID })
    })
    //test
    
    //socket emit for user-offline
    socket.on("user_offline", (data: any) => {
        console.log('offline', data)
        const { userID, dateTime } = data;
        socket.broadcast.emit(`user_offline_${userID}`, { ...data, userStatus: false })

        userModel.findByIdAndUpdate({ _id: userID }, { $set: { lastseen: dateTime  } }).then((res: any) => {

        }).catch((err: any) => {
            console.log(err)
        })
    })
}

export default globalSocket