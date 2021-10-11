const nodemailer = require('../config/nodemailer');

// this is another way of exporting method
exports.newComment = (comment) => {

    console.log('inside new comment mailer',comment);
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comment/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from: 'pankajkr12022001@gmail.com',
        to: 'pankajgiri82392@gmail.com',
        subject: "New Comment Published",
        html: htmlString
    },(err,info) => {

       if(err)
       {
           console.log('error in sending mail',err);
           return;
       }

       console.log('message Sent',info);
       return;

    })
}