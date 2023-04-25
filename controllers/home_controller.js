const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home = async (req, res,) =>{
    //manually
  // console.log(req.cookies);                                          
    // res.cookie('user_id', 20);
    // Post.find({}, (err, posts)=>{
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    // });
                                                    // population without using async await
                                                        //     Post.find({})
                                                        //     .populate('user')
                                                        //     .populate({
                                                        //         path: 'comments',
                                                        //         populate: {
                                                        //             path: 'user'
                                                        //         }
                                                        //     })
                                                        //     .exec(function(err, posts){
                                                        //         // console.log(req.user);
                                                        //         if(err){
                                                        //             console.log(err);
                                                        //         }
                                                        //         User.find({}, (err, users)=>{
                                                        //             return res.render('home', {
                                                        //                 title: "Home",
                                                        //                 posts: posts,
                                                        //                 all_users: users
                                                        //             });
                                                        //         });
                                                        //     });
                                                        // };
  
try{
    //Populating the user
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate:{
            path: 'likes'
        },
        options: {
            sort: { createdAt: -1 } 
        }
    })
    .populate('likes');

        let users = await User.find({});
         return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: users
            });
}catch(err){
    console.log('Error',err);
    return;
}
   
}

module.exports.about = (req, res) =>{
    return res.render('home', {
        title: "About"
    });
};
