{
    let createPost = function(){

        let newPostform = $('#new-post-form');
       
        // lets make a ajax request
        newPostform.submit(function(e) {
            e.preventDefault();
             
            $.ajax({
                 
                type: 'Post',
                url: '/posts/create',
                data: newPostform.serialize(), 
                success: function(data){
                      console.log(data);
                     
                }, error: function(error){
                    console.log(error);
                }
            })
        })
        // end of the ajax request

    }

    createPost();
}