
// {
// let createComment = function(){

//     let newCommentform = $('#new-comment-form');


//     newCommentform.submit(function(e) {
//         e.preventDefault();
         
//         $.ajax({
             
//             type: 'Post',
//             url: '/comment/create',
//             data: newCommentform.serialize(), 
//             success: function(data){
//                 let newComment = newCommentDom(data.data.comment);
//                  console.log(newComment);
//             }, error: function(error){
//                 console.log(error);
//             }
//         })
//     })

// }

// let newCommentDom = function(comment)
// {
//   return $(` <div class="comment-user-profile">
//   <span><img src="${ comment.user.avatar }"></span>
// </div> 
// <div class="comment-user-content">
// <span class="comment-user-name">${ comment.user.name}</span>
// <span>${ comment.content }</span>
// </div>
// <div class="comment-delete-btn">
  
   
//    <a href="/comment/destroy/${comment._id}"><button>delete</button></a>
    

// </div>`)
// }



// createComment();
// }