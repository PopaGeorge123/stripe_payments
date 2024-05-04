// Path: libs/emails.js

import axios from "axios";
import ejs from "ejs";
import fs from 'fs';
import path from "path";

//../templates/emails/newsletter.ejs how to use this path

export const sendNewsletterMail = async (email , name , url) => {
  try {
    const templatePath = path.join(process.cwd(), 'templates', 'emails', 'newsletter.ejs');
    const htmlContent = fs.readFileSync(templatePath, 'utf8');
    const renderedHtml = ejs.render(htmlContent,{
      name: name,
      url: url
    });

    const headers = {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    };

    const data = {
      sender: {
        name: 'Topia Rank',
        email: process.env.BREVIO_EMAIL_SENDER,
      },
      to: [
        {
          name: 'User',
          email: email
        },
      ],
      subject: 'There are good news for you! Topia Rank is here with the best deals!',
      htmlContent: renderedHtml,
    };

    axios.post('https://api.brevo.com/v3/smtp/email', data, { headers })
      .then(response => {
        console.log('Email sent successfully');
        console.log("Status : ", response.status);
      })
      .catch(error => {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
      });
  } catch (error) {
    console.error("Error occurred ", error);
  }
}