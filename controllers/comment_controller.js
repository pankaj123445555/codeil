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
              
            post.comments.push(comment);
            post.save();
            // adding the nodemailer module
            commentMailer.newComment(comment);
            // ending up the nodemailer module
            if(req.xhr)
            {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "succesfully deleted the post"
                })
                
            }
            // end
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
        comment.remove();
        Post.findByIdAndUpdate(postId,{$pull: {comment: req.params.id}},function(err,post){
        
            return res.redirect('back');
        });
          
         
           
       
    });
}
// ending of deleting a comment