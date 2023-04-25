const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of like
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'docModel'
    },
    // this define the the type of the boject liked since it is a dynamic reference
    docModel: {
        type: String,
        require: true,
        enum : ['Post', 'Comment']
    }
},{
    timestamps: true
})

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;