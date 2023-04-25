const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment')

module.exports.createSession = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Inavlid username or password'
            });
        }
            return res.status(200).json({
                message: 'Sign is successfull , here is your token',
                data: {
                    token: jwt.sign(user.toJSON(), env.JWT_secret_key, {expiresIn: '100000'} )
                }
            }) 
        }catch(err){
            console.log('----',err);
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
}
