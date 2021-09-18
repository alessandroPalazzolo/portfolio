const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const app = express();

const corsOptions = {
   origin: process.env.CLIENT_URL,
   optionSuccesStatus: 200
}

app.use(cors(corsOptions));
app.use(morgan("common"));
app.use(express.json());

const transporter = nodemailer.createTransport({
   port: 465,              
   host: "smtp.gmail.com",
      auth: {
           user: 'portfolio.plz@gmail.com',
           pass: process.env.MAIL_PW,
        },
   secure: true,
});

app.use(express.static(path.resolve(__dirname, "../portfolio--client/build")));

app.post("/mail", (req, res) => {
   console.log("request received from" + req.headers);
   const mailData = {
      from: 'portfolio.plz@gmail.com', 
      to: "alessandrorochepalazzolo@gmail.com", 
      subject: 'portfolio contact',
      text: JSON.stringify(req.body)
   };

   transporter.sendMail(mailData, (err, info) => {
      if(err) {
         console.log(err);
         res.json({ mailStatus: false });  
         return;
      }
      else
         res.json({ mailStatus: true })
   });
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("listening on port " + port));