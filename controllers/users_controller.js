const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.userProfile = (req, res)=>{
    User.findById(req.user.id, (err, user)=>{
        return res.render('user', {
            title: "User Profile",
            profile_user: user
        });
    })
};

module.exports.profile = (req, res) => {
    User.findById(req.params.id, function(err, user){
        return res.render('user', {
            title: "User Profile",
            profile_user: user
        });
    });
    
//     if(req.cookies.user_id){
//     User.findById(req.cookies.user_id, (err, user) => {
//         if(err){
//             console.log('Error in fetching user details');
//             return res.redirect('back');
//         }
//         if(user){
//             return res.render('user.ejs', {
//                 title: "User Profile",
//                 user: user
//             })
//         }
    
//         return res.redirect('/users/logIn');
//     });
//     return res.render('user', {
//         title: "Users"
//     });
// }else{
//     return res.redirect('/users/logIn');
// }
};

module.exports.update = async (req, res)=>{
   if(req.user.id == req.params.id){
        // User.findByIdAndUpdate(req.params.id, req.body, (err, user)=>{
        //     return res.redirect('back')
        // })
        try{
        let user = await User.findById(req.params.id);
        console.log(user);
        User.uploadAvatar(req, res, (err)=>{
            if(err){
                console.log('error in multer', err);
            }
            console.log(req.file);
            user.name = req.body.name;
            user.email = req.user.email;

            if(req.file){

                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                }
                //saving file into the avatar fieldd in the user
                user.avatar = User.avatarPath +'/'+ req.file.filename;
            }
            user.save();
            console.log("avatar uploaded");
            return res.redirect('back');
            
        })
        req.flash('success', 'Updated successfully');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    }else{
        req.flash('error', 'You are not authorized user');
        return res.status(401).send('You are Unauthorized');
    }
};

module.exports.bio = (req, res) =>{
    return res.render('user', {
        title: "Bio"
    });
};

module.exports.signUp = (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/userProfile');
    }else{
        req.flash('error', 'Error in signing up!');
    }
   
    return res.render('sign_up', {
        title: "Codeial | Sign Up"
    });
};

module.exports.logIn = (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('log_In', {
        title: "Codeial | Log In"
    });
};
// get sign up data
module.exports.create = (req, res) => {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, (err, user) => {
        if(err){console.log('error in signing up'); 
        return ;
        };

        if(!user){
            User.create(req.body, (err, user) => {
                if(err){
                    req.flash('error', 'error in signing up');
                    return
                }
                    req.flash('success', 'Thankyou! Registered successfully');
                    return res.redirect('/users/logIn');
            })
        }else{
            return res.redirect('back');
        }
    });
};

// get log in data
module.exports.createSession = function(req, res){

    req.flash('success', 'Logged in successfully');
     return res.redirect('/');
        
}
module.exports.destroySession = (req, res) =>{
    req.logout( (err)=>{
        if(err){
        console.log(err);
        return res.redirect('/');
        }
    });
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}