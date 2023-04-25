const queue = require('../config/kue');
const kue = require('../config/kue');

const commentMailer = require('../mailers/comments_mailer');

queue.process('emails', function(job, done){
    console.log('here is data whic workey carries: ', job.data);
    commentMailer.newComment(job.data);
    done;
});