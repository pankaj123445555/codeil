const nodemailer = require("nodemailer");
// this is for sending the ejs template
const ejs = require('ejs');

const path = require('path');
const { realpath } = require("fs");

// this is for sending the email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "pankajkr12022001@gmail.com",
        pass: 'Pankaj@123'
    }
});

// this is for rendering the template
let renderTemplate = (data,relativePath) => {

    let mainHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template)
        {
            if(err)
            {
                console.log('error in rendering the template',err);
                return;
            }
            mainHTML = template
        }
    )
    return mainHTML;

}

// exporting the file
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}