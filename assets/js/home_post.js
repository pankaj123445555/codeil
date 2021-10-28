

 

{
    let createPost = function(){

        let newPostform = $('#new-post-form');


        newPostform.submit(function(e) {
            e.preventDefault();
             
            $.ajax({
                 
                type: 'Post',
                url: '/posts/create',
                data: newPostform.serialize(), 
                success: function(data){
                     let newPost = newPostDom(data.data.post);
                     new ToggleLike($(' .toggle-like-button',newPost));
                    $('#posts-container>ul').prepend(newPost);
                    createComment();
                    // deletePost($('.delete-post-btn'))
                     
                    
                }, error: function(error){
                    console.log(error);
                }
            })
        })
    }
    
    
    //    method to create a post in dom
    // this is the hardcoded
    let newPostDom = function(post)
    {
        return $(` <li id="post-${post._id}">
        <p>
         
            <small>
                <a class="delete-post-btn" href="/posts/destroy/${ post._id }"><button type="button">delete</button></a>
            </small>
            
            
       
         ${post.content}

        
        <small>
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
        0 likes</a>
    </small>
         
     
        </p>

 
<div class="comment-container">
     

        <form action="/comment/create" id ="new-comment-form" method="POST">
            <input name="content" type="text" placeholder="write a comment">
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="add">
        </form>

        
</div>

 
<!-- load the cooment and show the comment -->
<div class="post-comment-list">
    <ul class="post-comment-${post._id}">
         
            

    </ul>
</div>
    </li>`)
    }


    // returning the newcomment
    let newCommentDom = function(comment)
    {
         return $(` <li id= comment-${comment._id}>
         
           
           <small>
               <a class ="delete-comment-btn"  href="/comment/destroy/${comment._id }"><button type="button">delete</button></a>
           </small>
            
           
           
           
        
       
           ${comment.content}
           <small>
               <a   data-likes="${ comment.likes.length }"  class="toggle-like-button" href="/likes/toggle/?id=${comment._id}&type=Comment"> 0 likes </a>
                
           </small>
           
       </li>`)
    }
    // ending of returning the new comment

    let deletePost = function(deletelink)
    {
        $(deletelink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data)
                {
                    console.log(data);
                   
                    // this is for the removing the data from the screen
                   $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    // function to create a post
    let createComment = function(){

        let newCommentform = $('#new-comment-form');


        newCommentform.submit(function(e) {
            e.preventDefault();
             
            $.ajax({
                 
                type: 'Post',
                url: '/comment/create',
                data: newCommentform.serialize(), 
                success: function(data){
                    console.log(data);
                    let newcomment = newCommentDom(data.data.comment);
                    new ToggleLike($(' .toggle-like-button',newcomment));
                    $(`.post-comment-${data.data.comment.post}`).prepend(newcomment);
                    deleteComment($(' .delete-comment-btn'));
                }, error: function(error){
                    console.log(error);
                }
            })
        })
    }
     
    // ending up of creating a post


    //  now its time to destroy the comment
    let deleteComment = function(deletelinkcomment)
    {
        $(deletelinkcomment).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deletelinkcomment).prop('href'),
                success: function(data)
                {
                    console.log($(`#comment-${data.data.comment._id}`));
                   $(`#comment-${data.data.comment._id}`).remove();
                },error: function(error){
                    console.log('error on deleting the cooment using ajax');
                }
            })
        })
    }
    // ending of destroy the comment
           
    createComment();
    deletePost($(' .delete-post-btn'))
    createPost();
    deleteComment($(' .delete-comment-btn'));
    
}