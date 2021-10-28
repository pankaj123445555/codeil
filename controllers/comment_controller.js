const Post = require('../models/post');

const Comment = require('../models/comments');
const commentMailer = require('../mailer/comment_mailer');
module.exports.create = function(req,res)
{
    //  here the request.body.post is the id of post where we create a comment and we pass the post id through form input check it out
    Post.findById(req.body.post,function(err,post){
        if(post)
        {
           Comment.create({
            content: req.body.content,
            post: req.body.post,
            user:req.user._id,
           },function(err,comment){
               if(err)
               {
                   console.log('error in adding the comment',err);
                   return;
               }
              console.log(comment);
            post.comments.push(comment);
            post.save();
              
            
            // adding the nodemailer module
            commentMailer.newComment(comment);
            // ending up the nodemailer module
             
            
            res.redirect('/');
           
           });
        }
    });
}






// deleting a comment
module.exports.destroy  = function(req,res)
{
    Comment.findById(req.params.id,function(err,comment){
        if(err)
        {
            console.log('error in deleting a comment',err);
            return;
        }
        let postId = comment.post;
        console.log(comment);
        comment.remove();
        Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}},function(err,post){
           
            if(err)
            {
                console.log('error on updating the post');
                return;
            }
            
            
        });

         return res.redirect('back');
       
    });
}
// ending of deleting a comment


// if(req.xhr)
//             {
//                 return res.status(200).json({
//                     data: {
//                         comment: comment
//                     },
//                     message: "succesfully deleted the post"
//                 })
                
//             }