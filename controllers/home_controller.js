
const Post = require('../models/post');
// const { populate } = require('../models/user');
const User = require('../models/user');
 
const Chat = require('../models/chat_file');
const { populate } = require('../models/post');



module.exports.addFriend = async function(req,res)
{
    let users = await User.find({});
    return res.render('friend_request',{users: users, footerhidden: false, headerhidden: false,title: "understand a signin"});
}


// edit as async 
 
module.exports.home =   async function(req,res){

    // we didnot need a call back function posts store a successfull response

    try{

        let posts =  await Post.find({})
.sort('-createdAt')        
.populate('user')  
.populate({

    path: 'comments',
    populate: [
        {
            path: 'user'
        },
        {
            path: 'likes'
        }
    ]
     
})
.populate('likes')
 
let usering = await User.find({})   
.populate({
    path: 'posts',
    populate: [
        {
            path: 'user'
        }
    ]
})


// adding the friendships 
let users = await User.find({})   //  Find all the users to send them on home page    ***** TODO: Don't set the password to browser  **** *
 
 
 let chatting = await Chat.find({})
 
        

      


    return res.render('main',{usering: usering, chatting: chatting, posts:posts, all_user: users, footerhidden: false, headerhidden: false,title: "understand a signin"});


    }catch(err){
         console.log('error in fetching the user and post',err);
    }
 

}

// in async populate function not works

// module.exports.home =  function(req,res){

//      Post.find({})
//     .sort('-createdAt')        
//     .populate('user')  
//     .populate({
//         path: 'comments',
//         populate: [
//             {
//                 path: 'user'
//             },
//             {
//                 path: 'likes'
//             }
//         ]
        
         
//     })
//     .populate('likes')
//     .exec(function(err,posts){

//         User.find({},function(err,user){
             
//             return res.render('homes',{ posts:posts, all_user: user, footerhidden: false, headerhidden: false,title: "understand a signin"})
//         })
         

//     })

// }

