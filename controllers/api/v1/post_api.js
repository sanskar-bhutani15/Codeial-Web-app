const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
module.exports.index = async(req, res)=>{

    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        options: {
            sort: { createdAt: -1 } 
        }
    });

    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    })
}

module.exports.destroy= async(req, res)=>{
    try{
        let post = await Post.findById(req.params.id);
        //.id means coverting the object ID into string which is a boon by mongoose
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});
            return res.status(200).json({
                message: 'Posts and associated comments are deleted Successfully'
            })
            }else{
                return res.status(401).json({
                    message: 'you can not delete this post'
                })
            }
            }catch(err){
                console.log('error in deleting', err);
                return res.json(500, {
                    message: 'Internal Server error'
                })
            } 
}