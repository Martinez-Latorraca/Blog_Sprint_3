const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const sendEmail = (user, articleId) => {
  // el user.email trae el mail del propietario del articulo para mandarle mail avisando del nuevo comment
  const msg = {
    to: ["nicomar2004+@gmail.com", "mvperera@gmail.com", "lorec.rincon@gmail.com"], // esta asi porque son ficticios los mails hechos por faker
    from: "nicomar2004@gmail.com",
    subject: "There is a new comment on your article",
    text: "Contenido del correo electrónico en formato de texto sin formato",
    html: `<h1>Hello ${user.name},</h1>
    <p>There is a new comment on one of your articles!</p>
    <p>To view the comment, click on the following link:</p>
    <p><a href="http://localhost:3000/articulos/${articleId}">[link to comment]</a></p>
    <p>Thank you for using our blog!</p>`,
  };

  sgMail.send(msg).then(() => console.log("Email sent to", user));
};

module.exports = { sendEmail };
