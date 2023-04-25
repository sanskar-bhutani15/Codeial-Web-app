const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signUp' 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like' 
    }]
},{
    timestamps: true
});
const Comment = mongoose.model('Comment', commentSchema);
console.log('Schema is checked and running');
module.exports = Comment;