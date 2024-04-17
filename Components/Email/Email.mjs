import mailer from 'nodemailer';
import {readFileData} from '../File/FileOperation.mjs';
import path from 'path';
import handlebars from 'handlebars';


const requiredMailDataField = [
    'subject',
    'user_email',
    'template_path'
];

export function sendemail(data = {})
{
    let response = {};
    let formattedMailData = verifyMailDataContent(data);
    if (formattedMailData.success) {
        let mailData = formattedMailData.data;
        // Create a transporter object using the default SMTP transport
        const transporter = mailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "yashagrawal@cedcommerce.com",
              pass: "lfdwkaxngwxaobeh",
            },
          });
    
        // Set up email data
        let emailTemplateData = readFileData(mailData.template_path);
        const emailTemplate = handlebars.compile(emailTemplateData);
        const emailContent = emailTemplate(mailData.extraData);
        const mailOptions = {
            from: 'yashagrawal@cedcommerce.com', // Sender address
            to: mailData.user_email, // List of recipients
            subject: mailData.user_email, // Subject line
            html : emailContent,
        };
        // Send email
        response =  transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                return  error.message;
            }
            console.log('Email sent successfully!');
        });
    } else {
        response = formattedMailData;
    }
    return response;

}

/**
 * function to verify the content if the emailData
 * @param {object} mailData 
 * @returns object
 */
function verifyMailDataContent(mailData = {})
{
    let formattedData = {
        success : true,
        data : {
            extraData : {}
        }
    };
    for (const field of requiredMailDataField) {
        if (field in mailData && mailData[field] !== '') {
            formattedData.data[field] = mailData[field]
        } else {
            formattedData.success = false;
            formattedData.message = `Required field '${field}' is missing!`;
            delete formattedData.data;
            break;
        }
    }
    if ('extraData' in mailData && mailData['extraData'] !== '') {
        formattedData.data.extraData = mailData['extraData']
    }
    return formattedData;
}

// require('../../controllers/Email.html');

// console.log(sendemail({
//     subject : 'test',
//     user_email : 'yashagrawal@cedcommerce.com',
//     template_path : '../../controllers/Email.hbs',
//     extraData : {
//         name : 'Arsene Lupin'
//     }
// }));

