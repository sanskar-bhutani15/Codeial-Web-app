class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        console.log(userEmail);
        this.socket = io.connect('http://localhost:3000');
        if(this.userEmail){
            this.connectionHandler();
        };
    };
   
    connectionHandler(){
        // console.log(this.socket);
        let self = this;
        console.log('>>>>>>>>SELF', self);
        this.socket.on('connect', function(){
            console.log('connection Establish uing sockets....!');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            },
            console.log('this is just check----', self.userEmail));

            self.socket.on('user_Joined', function(data){
                console.log('user joined ', data);
            });
        });

        //sending message clicking via button
        $('#sendBtn').click(function(){
            let msg = $('#input-text').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });
        self.socket.on('received_message', function(data){
           

            console.log('Message Received', data.message);

            let newMessage = $('<li>');
            let messageType = 'other-Message';

            if(data.user_email == self.userEmail){
                messageType = 'self-Message'
            };

            newMessage.append($('<span>'), {
                'html': data.message 
            });

            newMessage.append($('<sub>'),{
                'html': data.user_email
            });
            newMessage.addClass(messageType);
            $('chatlist').append(newMessage);
        });
    };
    
}