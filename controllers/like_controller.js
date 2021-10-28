const Like = require('../models/likes');
const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res)
{
    console.log(req.query);
    
    try{
        // likes/toggle/?id =abcde& type = post/comment
        let likeable
        let deleted = false;
        if(req.query.type == 'Post')
        {
            
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else
        {      
            
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        // check if like is already exist
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onmodel: req.query.type,
            user: req.user._id
        })

        if(existingLike)
        {
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true
        }
        else
        {
            // else make a like 
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike);
        
            likeable.save();
        }
        
        return res.json(200,{
            message : "Request Successfull",
            data: {
                deleted: deleted
            }
        })
        
         

    }catch{
        console.log('error in the like_controller action');
        return res.json(500,{
            message: 'internal server error'
        })
    }
}