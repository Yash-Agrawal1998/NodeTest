import { otpCollection } from '../models/otp.mjs';
import { sendemail } from '../Components/Email/Email.mjs';
import { getCurrentYear, getCurrentDate, getCurrentMonth } from '../Components/Date/Date.mjs';
import path from 'path';

/**
 * function to send the otp email
 * @param {*} request 
 * @param {*} response 
 */
export async function sendOtp(request, response)
{
    let requestData = request.body;
    if (requestData.email) {
        try {
            let otp = generateOtp();
            let email = requestData.email;
            let name = requestData.first_name;
            otpCollection.create({
                email_id : email,
                otp : otp
            });
            let emailFilePath = path.resolve('/app/src/views/Email.hbs');
            sendemail(
                {
                    subject : 'OTP email',
                    user_email : email,
                    template_path : emailFilePath,
                    extraData : {
                        name : name,
                        otp : otp,
                        currentDate : `${getCurrentDate()} ${getCurrentMonth()}, ${getCurrentYear()}`,
                        currentYear : getCurrentYear()
                    }
                }
            );
            response.json({
                'success' : true,
                'message' : 'otp send successfully',
            });

        } catch (error) {
            response.json({
                'success' : false,
                'message' : error.message,
            });
        }
    } else {
        response.json({
            'success' : false,
            'message' : `Required field 'email' is missing`
        });
    }
}

/**
 * function to verify the otp
 * @param {*} request 
 * @param {*} response 
 */
export async function verifyOtp(request, response)
{
    let requestData = request.body;
    if (requestData.otp) {
        let otp = Number(requestData.otp);
        let otpData = await otpCollection.findOne(
            {
                otp : otp
            }
        );
        if (otpData) {
            response.json({
                'success' : true,
                'message' : 'Email verification done successfully!'
            });
        } else {
            response.json({
                'success' : false,
                'message' : 'Invalid otp!'
            });
        }
    } else {
        response.json({
            'success' : false,
            'message' : `Required field 'otp' is missing`
        });
    }
}

/**
 * function to generate the otp
 * @returns number
 */
function generateOtp()
{
    return Math.floor((Math.random() * 900000) + 100000);
}

