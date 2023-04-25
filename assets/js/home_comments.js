// // Let's implement this via classes

// // this class would be initialized for every post on the page
// // 1. When the page loads
// // 2. Creation of every post dynamically via AJAX
// {
class postComments{
    constructor(postId){
        // inititiallizing the instance of a class whenever ne instance is created - why use constructor 
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);
        let self= this;
        //call on existing all comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            console.log($(this));
            console.log(self, 'delete self');
            self.deleteComment($(this));   
        });
    };

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let Self = $(this);
            
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: Self.serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(` .post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new ToggleLike($('.toggle-like-button'), newComment);
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            });
        });
        
    };

    newCommentDom(comment){
        return $(`<li id="comment-${comment._id}">
                <p>
                  ${comment.content}
                  
                        <small>
                            <a class="delete-comment-button"href="/comments/delete/${comment._id}">Delete</a>
                        </small>
                
                  <small>
                  ${comment.user.name}
                  </small>
                  <small>
                  <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">0 Likes</a>
                  <small>
                </p>
                  </li>`);
    };

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
         
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: (data)=>{
                    console.log($(`#comment-${data.data.comment_id}`));
                    $(`#comment-${data.data.comment_id}`).remove();
                    // $(`#comment-${data.data.comment_id}`).closest('ul').find(`#comment-${data.data.comment_id}`).remove();
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            });
        });
    };
};
// $(document).ajaxStop(function(){
//     window.location.reload();
// });
// };
