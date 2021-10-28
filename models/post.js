

const mongoose = require('mongoose');
const multer = require('multer');
const path   = require('path');
const AVTAR_PATH = path.join('/uploads/users/avatars');
 


const postSchema = new mongoose.Schema({

content:{
    type: String,
    require: true
    
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
comments: [

    {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
],
likes : [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Like'  
    }
],
avatar: {
    type: String
},

},{
    timestamps:true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVTAR_PATH))
      
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

//   static methods
postSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatars');
postSchema.statics.avatarPath = AVTAR_PATH;


const Post = mongoose.model('Post',postSchema);
module.exports = Post;