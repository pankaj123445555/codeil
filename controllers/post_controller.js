
const Post = require('../models/post');
module.exports.create = function(req,res)
{
    console.log(req.body);
    Post.create({
        content: req.body.content,
        user: req.user._id                                                           // if error is something that canot read the property and you write the right code means syantatically correct then put it into the ''colon
    } ,function(err,post){
        if(err)
        {
            console.log('error at the posting the post',err);
            return;
        }
        
        res.redirect('back');
    });
      
}