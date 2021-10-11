
const Post = require('../models/post');
const Comment = require('../models/comments');
module.exports.create = function(req,res)
{
    console.log(req.body);
    Post.create({
        content: req.body.content,
        user: req.user._id                                                           // if error is something that canot read the property and you write the right code means syantatically correct then put it into the ''colon
    } ,function(err,post){
    
        // this is for the ajax request
        //  console.log(req.xhr);
        if(req.xhr){ 
            return res.status(200).json({
             data: {
                 post:post
             },
             message: "post created!"
            })
        }
        // end of the ajax request
        if(err)
        {
            console.log('error at the posting the post',err);
            return;
        }
        
        res.redirect('back');
    });
      
}
// deleting a post only user can delete its own post
module.exports.destroy = async function(req,res)
{

    try {

        let post = await Post.findById(req.params.id)
      
     if(post.user==req.user.id)
     {
        //  this is for deleting the post 
         post.remove();
         
        //  this is for deleting all the comment
        await  Comment.deleteMany({post: req.params.id})
        
         
         if(req.xhr)
         {
             return res.status(200).json({
                 data: {
                     post_id : req.params.id
                 },
                 message: "succesfully deleted the post"
             })
             
         }


             return res.redirect('back');
         
     }
     else
     {
         return res.redirect('back');
     }
        
    } catch (error) {
        
        console.log('error on deleting a post');
    }
   
   
}