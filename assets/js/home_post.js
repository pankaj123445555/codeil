

 

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
                    $('#posts-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-btn'))
                     
                    
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
                     
                       var element = $(`.post-comment-${data.data.comment.post}`)
                       element.append( `<small>
                        <a href="/comment/destroy/${ data.data.comment._id }"><button type="button">delete</button></a>
                    </small>`)
                       element.append(`${data.data.comment.content}`);
                }, error: function(error){
                    console.log(error);
                }
            })
        })
    }
     
    // ending up of creating a post
           
    createComment();
    deletePost($(' .delete-post-btn'))
    createPost();
   
}