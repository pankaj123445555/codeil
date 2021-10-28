
const Post = require('../models/post');
// const { populate } = require('../models/user');
const User = require('../models/user');
 
const Chat = require('../models/chat_file');
const { populate } = require('../models/post');




module.exports.addFriends = async function(req,res)
{
    let userss = await User.find({});
    return res.render('friend_request',{userss:userss,  footerhidden: true, headerhidden: false,title: "understand a layout"});
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
let loggedInUser;
if(req.user){   //  Find all the friends of the user if user is logged in
    loggedInUser = await User.findById(req.user._id)
    .populate({
        path: 'friendships',
        populate: [
            {
                path: 'from_user'  // ***** TODO: Don't set the password to browser  *****
            },
            {
                path: 'to_user'   // ***** TODO: Don't set the password to browser  *****
            }
        ]
    });

}
 
 let chatting = await Chat.find({})
 
        

      


    return res.render('main',{usering: usering, chatting: chatting, posts:posts, all_user: users, loggedInUser:loggedInUser, footerhidden: false, headerhidden: false,title: "understand a signin"});


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

