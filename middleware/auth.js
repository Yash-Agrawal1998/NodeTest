const {verifyToken} = require('../service/Authentication');

async function validateLoginData(request, response, next) {
    if (!request.body.email ||!request.body.password) {
        response.json({
            success : false,
            message : 'Required field email or password is missing!'
        });
    } else {
        next();
    }
}

async function verifyUser(request, response, next)
{
    let headerData = request.headers;
    if (headerData.authorization) {
        let token = headerData.authorization;
        let validationResponse = verifyToken(token);
        if (validationResponse.success) {
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

module.exports = {
    validateLoginData,
    verifyUser
}