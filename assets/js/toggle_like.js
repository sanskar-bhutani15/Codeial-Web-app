
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
       
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this; 
            $.ajax({
                type:'Post',
                url: $(self).attr('href')
            }).done(function(data){
                let likeCount = parseInt($(self).attr('data-likes'));
                if(data.data.deleted == true){
                    likeCount -= 1
                }else{
                    likeCount += 1
                }
                $(self).attr('data-likes', likeCount);
                $(self).html(`${likeCount} Likes`);
            }).fail(function(errorThrown){
                console.log("error in completing the request--", errorThrown);
            });
        });
    }
}