const jwt = require('jsonwebtoken');
const fileSystem = require('fs');
const path = require('path');

/**
 * function to set the userData if the credetials are valid
 * @param {*} userData 
 * @returns 
 */
function setUserData(userData)
{
    let privateKey = getPrivateKey();
    let jwtToken = jwt.sign(
        {
            _id : userData._id,
            first_name : userData.first_name,
            last_name : userData.last_name,
            email_id : userData.email_id,
            job_title : userData.job_title
        },
        privateKey,
        {
            algorithm : 'RS256',
            expiresIn : '4h'
        }
    );
    return jwtToken;
}

/**
 * function to verify the token
 * @param {*} token 
 * @returns 
 */
function verifyToken(token)
{
    let response = {};
    let publicKey = getPublicKey();
    try {
        response = {
            success : true,
            message : jwt.verify(token, publicKey)
        }
    } catch (error) {
        response = {
            success : false,
            message : error
        }
    }
    return response;
}


/**
 * function to get the public key
 * @returns 
 */
function getPublicKey()
{
    let publicKey = '';
    const publicKeyPath = path.resolve(__dirname, 'security/public_key.pem')
    try {
        publicKey = fileSystem.readFileSync(publicKeyPath, 'utf-8');
    } catch(error) {
        publicKey = error
    }  
    return publicKey;
}

/**
 * function to get the private 
 * @returns 
 */
function getPrivateKey()
{
    let privateKey = '';
    const privateKeyPath = path.resolve(__dirname, 'security/private_key.pem')
    try {
        privateKey = fileSystem.readFileSync(privateKeyPath, 'utf-8');
    } catch(error) {
        privateKey = error
    }  
    return privateKey;
}

module.exports = {
    setUserData,
    verifyToken
}