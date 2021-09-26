
const post = require('../models/post');

 
module.exports.home = function(req,res){
//    post.find({},function(err,posts)
//    {
//        if(err)
//        {
//            console.log('error in sending the post',err);
//            return;
//        }
//        return res.render('homes',{ posts:posts, footerhidden: false, headerhidden: false,title: "understand a signin"});
//    });
   
// }
post.find({}).populate('user').exec(function(err,posts){
    return res.render('homes',{ posts:posts, footerhidden: false, headerhidden: false,title: "understand a signin"});
});
}

