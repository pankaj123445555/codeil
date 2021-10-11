
const post = require('../models/post');
const User = require('../models/user');


// edit as async 
 
module.exports.home =async  function(req,res){

    // we didnot need a call back function posts store a successfull response

    try{

        let posts =  await post.find({})
.sort('-createdAt')        
.populate('user')
.populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
})
 
   let user = await User.find({})

    return res.render('homes',{ posts:posts, all_user: user, footerhidden: false, headerhidden: false,title: "understand a signin"});


    }catch(err){
         console.log('error in fetching the user and post',err);
    }
 

}

