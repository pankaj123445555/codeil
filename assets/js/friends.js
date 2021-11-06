

class FriendRequest{
    constructor(FriendElement){
        this.friend = FriendElement;
        this.addFriend();
    }


addFriend()
{

  
 $(this.friend).click(function(e){
    e.preventDefault();
   let self = this;
   console.log(this);
    $.ajax({
        url: $(self).attr('href'),
        method: 'GET',
        success: function(data){
            console.log(data.message);
            if(data.message == "add")
            {
                $(`#add-${data.data.user._id}`).html('Friends');
                $(self).attr('href',`/user/destroy-friend/${data.data.user._id}`)
            }
            else
            {
                $(`#remove-${data.data.user._id}`).html('Add-friend');
                $(self).attr('href',`/user/add-friend/${data.data.user._id}`)
            }
           
            
    },error: function(error){
        
        console.log('error on deleting the cooment using ajax',error);
    }
})

 })
}
}

// this is removing the friend
 