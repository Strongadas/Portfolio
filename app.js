 const express = require('express')
 const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const nodemailer = require('nodemailer')

const app = express()

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the appropriate email service
    auth: {
      user:'hello.minehub@gmail.com', // Your email address
      pass: 'jcfq coac mthx pphv' // Your email password or app-specific password
    }
  });
app.set('view engine','ejs')
app.use(express.static('public'))
//app.use(bodyParser.urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('home')
    
})

app.post('/contact', (req, res) => {
    const { name, subject, message , email} = req.body;
  
    const mailOptions = {
      from: email, // Replace with your email
      to: 'pederneiraanacleto@gmail.com',
      subject: `Hello Anacleto, ${name} has emailed you about ${subject} from ${email}` ,
      text: message, // Plain text version of the message
      
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email.');
      }
      console.log('Email sent:', info.response);
      res.render('emailled'); // Ensure you have an "emailed" view template
    });
  });


app.listen(4000,(req,res)=>{
    console.log('Server running on port 4000')
})