
// console.log(locals.user);

class ChatEngine{
    constructor(chatBoxId, userEmail,userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName
        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;
          console.log(this);
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(e){


            let msg = $('#chat-message-inputs').val();
              
           console.log(msg.length);
            

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,
                    chatroom: 'codeial'
                });
            }
             

        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);
           
             

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'my-message';
            }
            let newMessage = $('<div>');
              
             
             
            newMessage.append($('<span>', {
                'html': data.user_name,
                class : 'users-name'
            }));
            

            newMessage.append($('<span>', {
                'html': data.message,
                class: 'message'
            }));

           
            

            newMessage.addClass(messageType);
            
            $('#chat-message-list').append(newMessage);
        })
    }
    
}



     

         
             
            
    
    



        
