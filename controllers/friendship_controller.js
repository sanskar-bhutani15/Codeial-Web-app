const friendShip = require('../models/friendship');
const User = require('../models/user');

//sending the freind request
module.exports.sendRequest = async (req, res) =>{
try{
    const {from_user, to_user} = req.body;
    const Friend = new friendShip({from_user, to_user});
    console.log('Here is the friend------', Freind);
    await Friend.save();

    return res.status(200).json({message: 'Request Sent'});
}catch(err){
    console.log(err);
    return res.status(500).json({
        message: 'Error in sending req'
    })
}
}

//Accepting the request
module.exports.acceptRequest = async (req, res) =>{
try{
    const { id } = req.params;
    const Friend = await friendShip.findById(id);
    Friend.status= 'accepted'
    await Friend.save();

    return res.status(200).json({message: 'Request Accepted'});
}catch(err){
    console.log(err);
    return res.status(500).json({
        message: 'Error in accepting req'
    }) 
}
}