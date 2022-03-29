const pug = require('pug');
const { htmlToText } = require('html-to-text');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

class Email {
  constructor(emails) {
    this.emails = emails;
    this.from = `David suarez <${process.env.EMAIL_FROM}>`;
  }

  //define who send the mail
  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }

  //define who receive the mail
  async send() {
    const html = pug.renderFile(`${__dirname}/../emails/baseEmail.pug`); //maquetado

    await this.newTransport().sendMail({
      from: this.from, //my mail
      to: this.emails, // to which mail
      html, //var html (have the instructions to maquetado)
      text: htmlToText(html), //convert html code to text
      subject: 'This is a test email'
    });
  }
}

module.exports = { Email };
