
const Chat = require('../models/chat_file');



module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            
             Chat.create({
                 content: data.message,
                 user: data.user_name
             },function(err,chat){
                 if(err)
                 {
                     console.log('error in adding the chat in database',err);
                     return;
                 }
                 
             })
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}