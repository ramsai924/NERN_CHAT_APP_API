const globalSocket = function(socket: any){
    
    //socket emit for user-online
    socket.on("user_online", (data: any) => {
        console.log('online')
        const { userID } = data;
        socket.broadcast.emit(`user_online_${userID}`, { ...data, userStatus: true, text: userID })
    })
    //test
    
    //socket emit for user-offline
    socket.on("user_offline", (data: any) => {
        console.log('offline')
        const { userID, dateTime } = data;
        socket.broadcast.emit(`user_offline_${userID}`, { ...data, userStatus: false })
    })
}

export default globalSocket