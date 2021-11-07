
const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/user');
const Like = require('../models/likes');
 

module.exports.create = async  function(req,res){

    
  await  Post.uploadedAvatar(req,res, function(err){
        
        if(err)
        {
            console.log('error in uploaded avatar',err);
            return;
        }
         
    
       Post.create({
        
        content: req.body.content,
      avatar : Post.avatarPath + '/' +req.file.filename,
     user: req.user._id
    },function(err,post){
        if(err)
        {
            console.log('error in posting the post',err);
        }
        
        User.findById(req.user._id,function(err,user){
            if(err)
            {
                console.log('error in finding the user',err);
                return;
            }
            user.posts.push(post._id);
            user.save();
            // console.log('...../',post);
            console.log('...../',user);
        })
          
        
    })    
    })
    return res.redirect('back');

}




 
 






// deleting a post only user can delete its own post
module.exports.destroy = async function(req,res)
{
    

    try {

        let post = await Post.findById(req.params.id)
      
     if(post.user==req.user.id)
     {
        //  this is for deleting the post 
        let users = await User.findById(req.user.id);
       await User.findByIdAndUpdate(req.user.id,{$pull: {posts: req.params.id}}); 
         
         post.remove();
         
          users.save();
        //  this is for deleting all the comment
        await  Comment.deleteMany({post: req.params.id})
        await  Like.deleteMany({likeable: req.params.id})
        
     }
      
     return res.redirect('back');
     
        
    } catch (error) {
        
        console.log('error on deleting a post',error);
    }
   
   
}