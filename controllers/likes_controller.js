const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.toggleLike = async (req, res) =>{
try{
    let likeable;
    let deleted = false;
    if(req.query.type == 'Post'){
        likeable = await Post.findById(req.query.id).populate('likes');
    }else{
        likeable = await Comment.findById(req.query.id).populate('likes');
    }
    //check if a like already exist
    let existingLike = await Like.findOne({
        likeable: req.query.id,
        user: req.user._id,
        docModel: req.query.type
    })

    //deleting and existing like for adding a new like
    if(existingLike){
       
        likeable.likes.pull(existingLike._id);
        likeable.save();

        existingLike.remove();
        deleted = true;
    }else{
        let newLike = await Like.create({
            user: req.user._id,
            likeable: req.query.id,
            docModel: req.query.type
        })
        likeable.likes.push(newLike._id);
        likeable.save();
    }
    return res.status(200).json({
        message: 'Request Succesful',
        data:{
            deleted: deleted
        }    
    })




}catch(err){
    console.log(err);
    return res.status(500).json({
    message: 'Internal server error (L)'
    });
}
}