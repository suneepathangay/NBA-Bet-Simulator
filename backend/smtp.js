const nodemailer=require("nodemailer")


//transporter to access the gmail smtp servers
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'suneetpathangay@gmail.com',
        pass: 'prtrmasptvjuitlx'
    }
});


let mailOptions = {
    from: '"suneet pathangay👻" <suneetpathangay@gmail.com>', 
    to: 'suneetpathangay@gmail.com', 
    subject: 'Your Bet', 
    text: 'Hello', 
    html: '<b>Hello ' 
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
