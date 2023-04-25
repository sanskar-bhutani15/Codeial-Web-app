const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) =>{
    console.log(comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
    nodeMailer.transporter.sendMail({
        from: 'sanskarbhutani100@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in mailers', err);
            return;
        }

        // console.log('Message sent', info);
        return;
    });
}