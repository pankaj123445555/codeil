const User = require('../models/user');

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
module.exports.profile = function(req,res)
{
    if(req.cookies.userid)
    {
      User.findById(req.cookies.userid,function(err,user){
         if(err)
         {
             console.log('error in finding the cookie',err);
             return;
         }
         return res.render('user_profile',{ footerhidden: true, headerhidden: true,title: "understand a layout"});
      });
    }
    
}
 




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
        console.log('pankaj');
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


// sign in and create session for the user
module.exports.createSession = function(req,res)
{

    
    res.redirect('/');
}
module.exports.profile = function(req,res)
{
    

     return res.render('user_profile',{ footerhidden: true, headerhidden: true,title: "understand a layout"});
}
// creating sign out controller
module.exports.destroySession = function(req,res)
{
    req.logout();
    res.redirect('/');
}