import { userColletion } from "../models/user.mjs";
import { setUserData } from "../service/Authentication.mjs";
import { Di } from "../service/Di.mjs";

/**
 * function to get the userData
 * @param {*} request 
 * @param {*} response 
 */
export async function getUserData(request, response)
{
    let di = new Di();
    let userData = di.getData();
    response.json({success : true, data : userData});
}

/**
 * function to save the userData
 * @param {objectotpRoute} request 
 * @param {object} response 
 */
export async function saveUserData(request, response) {
    requestData = request.body;
    let responseData = {};
    try {
        if (requestData.email_id && requestData.password) {
            let encryptedPassword = btoa(requestData.password);
            let result = await userColletion.create(
                {
                    first_name : requestData.first_name,
                    last_name : requestData.last_name,
                    email_id : requestData.email_id,
                    job_title : requestData.job_title,
                    password : encryptedPassword
                }
            );
            responseData = {success : true, message : "Data saved successfully"}
        } else {
            responseData = {success : false, message : "Required data email_id or password is missing!"}
        }
    } catch(error) {
        responseData = {success : false, message : error}
    }
    
    response.json(responseData);
}

/**
 * function to find the data with the userId
 * @param {*} request 
 * @param {*} response 
 */
export async function findUserDataById(request, response) {
    let id = request.params.id;
    userData = await userColletion.findById(id);
    let responseData = {};
    if (userData) {
        responseData = {success : true, data : userData};
    } else {
        responseData = {success : false, message : `No data found with the userId : ${id}!`};
    }
    response.json(responseData);
}

/**
 * function to update the userData by userId
 * @param {*} request 
 * @param {*} response 
 */
export async function updateUserDataById(request, response) {
    let id = request.params.id;
    requestData = request.body;
    result = await userColletion.findByIdAndUpdate(id, requestData.update_data);
    let responseData = {};
    if (result) {
        responseData = {success : true, message : `Data updated for userId : ${id}!`};
    } else {
        responseData = {success : false, message : `No data found with the userId : ${id}!`};
    }
    response.json(responseData);
}

/**
 * function to delete the userData on the basis of userId
 * @param {*} request 
 * @param {*} response 
 */
export async function deleteUserDataById(request, response) {
    let id = request.params.id;
    result = await userColletion.deleteOne({_id : id});
    console.log(result)
    let responseData = {};
    if (result.deletedCount) {
        responseData = {success : true, message : `Data delete for usertId : ${id}!`};
    } else {
        responseData = {success : false, message : `No data found with the userId : ${id}!`};
    }
    response.json(responseData);
}

/**
 * function to perform the login action to the user
 * @param {*} request 
 * @param {*} response 
 */
export async function loginUser(request, response) {
    let bodyData = request.body;
    let encryptedPassword = btoa(bodyData.password);
    let userData = await userColletion.findOne(
        {
            email_id : bodyData.email,
            password : encryptedPassword
        }
    );
    if (userData) {
        let token = setUserData(userData);
        response.json({
            success : true,
            message : 'user logged in successfully',
            userToken : token
        })
    } else {
        response.json({
            success : false,
            message : 'Invalid email or password'
        });
    }
    
}

