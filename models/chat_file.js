const mongoose = require('mongoose');
 


const chatSchema = new mongoose.Schema({

content:{
    type: String,
    require: true
    
},
user:{

    type: String,
    require: true
     
},
},
{
    timestamps:true
});

const Chat = mongoose.model('Chat',chatSchema);
module.exports = Chat;