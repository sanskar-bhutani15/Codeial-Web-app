const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sents the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signUp'
    },
    // the user who accept the req
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signUp'
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, 
{
    timestamps: true
});

let FriendShip = mongoose.model('FriendShip', friendshipSchema);
module.exports = FriendShip;