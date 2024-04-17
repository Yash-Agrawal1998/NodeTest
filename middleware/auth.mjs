import { verifyToken  } from "../service/Authentication.mjs";
import { Di } from '../service/Di.mjs'

export async function validateLoginData(request, response, next) {
    if (!request.body.email ||!request.body.password) {
        response.json({
            success : false,
            message : 'Required field email or password is missing!'
        });
    } else {
        next();
    }
}

export async function verifyUser(request, response, next)
{
    let headerData = request.headers;
    if (headerData.authorization) {
        let token = headerData.authorization;
        let validationResponse = verifyToken(token);
        if (validationResponse.success) {
            let userData = validationResponse.message;
            let di = new Di();
            di.setData({
                _id : userData._id,
                first_name : userData.first_name,
                last_name : userData.last_name,
                email_id : userData.email_id,
                job_title : userData.job_title,
            })
            next();
        } else {
            response.json({
                success : false,
                message : 'Invalid Token!'
            })
        }
    } else {
        response.json({
            success : false,
            message : 'Authentication failed!'
        })
    }   
}
