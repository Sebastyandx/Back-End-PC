const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'gonzalogaete110@gmail.com', 
      pass: 'wdvfuqdpfzsseekf', 
    },
  });

  transporter.verify().then(()=>{
    console.log("listo para mandar emails")
    }).catch((err)=>{
    console.log('algo anda mal' + err)
  })

  const infoTransporter = async (fromTitle, toList, subject, html) => {
    transporter
      .sendMail({
        from: `"${fromTitle}" <despegue.info@gmail.com>`, // sender address
        to: `${toList}`, // list of receivers
        subject: `${subject}`, // Subject line
        html: `${html}`, // html body
      })
      .then(() => {
        console.log("transport OK");
      })
      .catch((e) => {
        console.log("transporter catch" + e);
      });
  };


module.exports={
  transporter,
  infoTransporter,
}