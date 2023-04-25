{
    //method for submiting form data using ajax
    let createPost = ()=>{
        let newPostForm = $('#new-post-form');

        newPostForm.submit((e)=>{
          e.preventDefault()
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: (data)=>{
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    //call the create comment class 
                    new postComments(data.data.post._id);

                    new ToggleLike($('.toggle-like-button'), newPost)
                },
                error: (error)=>{
                    console.log(error.responseText);
                },
            });
        });
}
    // method to create the post in DOM
let newPostDom = (post)=>{
    return $(`
    <li id="post-${post._id}">
    ${post.content}
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
        </small>
    ${post.user.name}
    <br>
    <small>
    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">0 Likes</a>
    <small>
    <div id="post-comments">
    <form id="post-${post._id}-comments-form"action="/comments/create" method="POST">
        <input type="text" name="content" placeholder="Add your comment here..." required>
        <input type="hidden" name="post" value="${post._id}">
        <input type="submit" value="post">
    </form>

    <div id="post-comments-list">
        <ul class="post-comments-${post._id}">
        </ul>
    </div>
</div>
</li>`
)}

//method to delete post 

let deletePost = (deleteLink)=>{
    $(deleteLink).click((e)=>{
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: (data)=>{
                $(`#post-${data.data.post_id}`).remove();
            },
            error: (error)=>{
                console.log(error.responseText)
            }
        });
    });
};

//loop overall the existing post on the page and caal the delete post method to delete link of each, also add ajax(using class we've created) to delete button each 
    let CovertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);
         // get the post's id by splitting the id attribute
         let postId = self.prop('id').split("-")[1];
         new postComments(postId);
    }) 
    }

    createPost();
    CovertPostsToAjax();
};
