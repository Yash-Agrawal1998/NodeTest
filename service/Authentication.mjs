import jwt from 'jsonwebtoken';
import { readFileData } from '../Components/File/FileOperation.mjs'

/**
 * function to set the userData if the credetials are valid
 * @param {*} userData 
 * @returns 
 */
export function setUserData(userData)
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
export function verifyToken(token)
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
export function getPublicKey()
{
    let publicKey = '';
    try {
        publicKey = readFileData('/app/security/publicKey.pem');
    } catch(error) {
        publicKey = error
    }  
    return publicKey;
}

/**
 * function to get the private 
 * @returns 
 */
export function getPrivateKey()
{
    let privateKey = '';
    try {
        privateKey = readFileData('/app/security/privateKey.pem');
    } catch(error) {
        privateKey = error
    }  
    return privateKey;
}
