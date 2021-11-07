const User = require('../models/user');
const fs = require('fs');
const path = require('path');
 
const Chat  = require('../models/chat_file');

// adding sign in page
module.exports.signin = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');  
    } 
    return res.render('home',{ footerhidden: true, headerhidden: true,title: "understand a signin"});
}
// adding the sign up page
module.exports.signup = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');  
    }
    return res.render('home',{ footerhidden: true, headerhidden: true,title: "understand a signout"});
}


// adding progile page
// module.exports.profile = function(req,res)
// {
//     if(req.cookies.userid)
//     {
//       User.findById(req.cookies.userid,function(err,user){
//          if(err)
//          {
//              console.log('error in finding the cookie',err);
//              return;
//          }
//          return res.render('user_profile',{ footerhidden: true, headerhidden: true,title: "understand a layout"});
//       });
//     }
//     User.findById(req.params.id, function(err,user){
//         if(err)
//         {
//             console.log('error in finding the user in profile page',err);
//             return;
//         }
//         else
//         {
//             console.log('finally it finds the user');
//            console.log(user);
//            return;  
//         }
//     });
//     console.log(req.params.id);
//     return res.render('user_profile',{ footerhidden: true, headerhidden: true,title: "understand a layout"});
    
// }
 




// satrting of the login page or sign in page
// module.exports.createSession = function(req,res)
// {
//     console.log(req.body);
//     User.findOne({email:req.body.email},function(err,user){
//        if(err)
//        {
//            console.log('error in finding the email',err);
//            return;
//        }
//        if(user)
//        {
//             if(user.password==req.body.password)
//             {
//                 res.cookie('userid',user.id);
//                 // console.log(user.id);
//                 console.log('finally password is matched');
//                 res.redirect('/user/profile');
               
//             }
//             else{
//                 console.log('password is not matched');
//                 return res.redirect('back');
//             }
//        } 
//        else{
//         return res.redirect('back');
//        }
       
//     });
// }
// end of the login or sign in page







// adding sign in page
module.exports.create = function(req,res){
    console.log(req.body);
     
    if(req.body.password!=req.body.confirmpassword)
    {
         
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
    
   if(err){console.log('error in finding the email'); return;}
    //   if agar is name ka email nahi milla
    console.log(user);
    if(!user)
    {
        User.create(req.body,function(err,user){
            if(err)
            {
                console.log('error in creating the user with the help of schema',err);
                return;
            }
            console.log('finally user is created');
            return res.redirect('back');
        });
    }
    else{
        console.log('user is found');
        return res.redirect('back');
    }
    });
}
// end of the sign in page







module.exports.profile = async function(req,res)
{
    
     let user = await User.findById(req.params.id)
    .populate({
    path: 'posts',
    populate: [
        {
            path: 'user',
        },
        
        {
            path: 'comments',
            populate: [
                {
                    path: 'user'
                }
            ]
        }
    ]
   })
         
         
    return res.render('user_profiles',{ users:user, footerhidden: true, headerhidden: false,title: "understand a layout"});
        
     
}

// create a controller for adding a friend
module.exports.Friend   = async function(req,res)
{
    console.log('...../','added works');
     let user = await  User.findById(req.params.id);
     let currUser = await User.findById(req.user.id);
     currUser.friendships.push(user._id);
     currUser.save();
     if(req.xhr)
     {
         return res.status(200).json({
             data: {
                 user: user
             },
             message: "add"
         })
         
     }
     console.log(currUser);
    return res.redirect('back');
}

// ending of adding a friend



// here the controller used for the updating the profile

module.exports.update = async function(req,res)
{
    
    let user =  await User.findByIdAndUpdate(req.params.id)
    
    if(req.user.id == req.params.id)
    {
        try{
            let user =  await User.findByIdAndUpdate(req.params.id);
             
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log('error in multer',err);
                    return;
                }
                
                user.name = req.body.name;
                user.email = req.body.email;
                user.content = req.body.about;
                user.phone = req.body.phone;
                user.address = req.body.address;
                if(req.file)
                {
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                }
                 
                if(req.file)
                {
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                }
                
                user.save();
                return res.redirect('back');
            })


        }catch(err){
            console.log('/////',err);
            return res.redirect('back');
        }
    }
    else
    {
        return res.status(401).send('unauthorised');
    }
}



// ending of updating the profile


// sign in and create session for the user
module.exports.createSession = function(req,res)
{
    // we used it in the middleware
    req.flash('success','logged in successfully');
    // end it of middleware
    res.redirect('/');
}
// ending the sign in page




// creating sign out controller
module.exports.destroySession = function(req,res)
{
    req.logout();
    // used it in the middleware
    req.flash('success','logged out successfully');
    // end it in the middleware

    res.redirect('/');
}

// its time to show the update page
module.exports.updatePage = async function(req,res)
{
    let users = await User.findById(req.params.id);
    return res.render('update_page',{ users:users, footerhidden: true, headerhidden: false,title: "understand a layout"});
}
// its time to destoy a friend
module.exports.destroyFriend = async function(req,res)
{
    console.log(req.params.id);
    let users = await User.findById(req.user.id);
     users.friendships.pull(req.params.id);
     users.save();
     let user = await User.findById(req.params.id);
     if(req.xhr)
            {
                return res.status(200).json({
                    data: {
                        user: user
                    },
                    message: "remove"
                })
                
            }

    return res.redirect('back');
}

 