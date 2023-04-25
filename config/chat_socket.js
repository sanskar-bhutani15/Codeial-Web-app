module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: '*'
        },
        // reconnection: true
    });

    io.sockets.on('connection', (socket)=>{
        console.log('new user connected', socket.id);

        socket.on('disconnect', ()=>{
            console.log(`User Disconnected ${socket.id}`);
        });
    
        socket.on('join_room', function(data){
            console.log('joining request received ', data);
    
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_Joined', data);
        });

        socket.on('send_message', function(data){
            console.log('Here ia the data------', data);
            io.in(data.chatroom).emit('received_message', data);
        });
    });
}