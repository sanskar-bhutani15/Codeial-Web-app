const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');

module.exports.create = async (req, res) => {
try{
   let post =  await Post.create({
        content: req.body.content,
        user: req.user._id
    }); 

        if(req.xhr){
            console.log('xhr');
            //populating user to show the name of the parent user in ajax 
            post = await post.populate('user', 'name');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        };
        console.log('End');
        req.flash('success', 'Post published');
        return res.redirect('back');
}catch(err){
    if(err){
        req.flash('error', err); 
        return res.redirect('back');
        };  
    };
};

module.exports.destroy = async (req, res) => {
    try{
    let post = await Post.findById(req.params.id);
    //.id means coverting the object ID into string which is a boon by mongoose
    if(post.user == req.user.id){

        await Like.deleteMany({likeable: post, docModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comments}});
        
        post.remove();

        await Comment.deleteMany({post: req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: 'Post Deleted!'
            });
        };

        req.flash('success', 'Post and associated comments are deleted');
        return res.redirect('back');
    }else{
       return res.redirect('back');
    }
        }catch(err){
            req.flash('error', err);
            return;
        } 
}

// manual code without using async
// Post.findById(req.params.id, (err, post)=>{
//     //.id means coverting the object ID into string which is a boon by mongoose
//     if(post.user == req.user.id){
//         post.remove();

//         Comment.deleteMany({post: req.params.id}, (err)=>{
//             return res.redirect('back')
//         })
//     }else{
//        return res.redirect('back');
//     }
// })