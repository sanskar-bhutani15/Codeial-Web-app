const Comment = require('../models/comments');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments_mailer');
const kue = require('../config/kue');
const commentWorker = require('../workers/comments_email_worker');
const queue = require('../config/kue');
const Like = require('../models/likes');

module.exports.create = async (req, res) =>{
    // console.log(req.body); just for checking if the desired output is passing or not
try{
   let post = await Post.findById(req.body.post);
    if(post){
       let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user', 'name email');
        // commentsMailer.newComment(comment);
        let job = queue.create('emails', comment).save(function(err){
            if(err){
                console.log('error in mail queue', err);
                return;
            }
            console.log('job enqueued: ',job.id);
        });

        if(req.xhr){
            // Similar for comments to fetch the user's id!
            
            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: 'comment Created!'
            });
            
        };
        req.flash('success', 'Comment posted');
        return res.redirect('/');
    }
}catch(err){
    req.flash('error', err);
    return;
}  
}

module.exports.delete = async (req, res)=>{
    try{
        let comment = await Comment.findById(req.params.id);
        
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

        Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}});

        await Like.deleteMany({likeable: comment._id, docModel: 'Comment'});

        if(req.xhr){
                // Similar for comments to fetch the user's id!
             return res.status(200).json({
                data: {
                     comment_id: req.params.id
                },
                message: 'Comment Deleted!'
                });
            }

            req.flash('success', 'Deleted successfully');
            return res.redirect('back');
        }
    }catch(err){
            console.log(err);
            req.flash('error', 'You cannot delete the comment');
            return res.redirect('back');
    }
}