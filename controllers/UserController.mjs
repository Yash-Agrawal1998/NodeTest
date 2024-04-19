import { userColletion } from "../models/user.mjs";
import { setUserData } from "../service/Authentication.mjs";
import { Di } from "../service/Di.mjs";
import { sendemail } from "../Components/Email/Email.mjs";
import { getCurrentYear, getCurrentDate, getCurrentMonth } from '../Components/Date/Date.mjs';

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

/**
 * function to update the user password
 * @param {*} request 
 * @param {*} response 
 */
export async function updatePassword(request, response)
{
    let bodyData = request.body;
    try 
    {
        if (bodyData.email) {
            let email = bodyData.email;
            let updatedPassword = generatePassword(8);
            let encryptedPassword = btoa(updatedPassword);
            let dbResponse = await userColletion.findOneAndUpdate(
                {
                    'email_id' : email, 
                },
                {
                    'password' : encryptedPassword
                }
            );
            if (dbResponse) {
                sendemail(
                    {
                        subject : 'Password Updation Done Successfully',
                        user_email : email,
                        template_path : '/app/src/views/PasswordRegenerate.hbs',
                        extraData : {
                            name : dbResponse.name,
                            password : updatedPassword,
                            currentDate : `${getCurrentDate()} ${getCurrentMonth()}, ${getCurrentYear()}`,
                            currentYear : getCurrentYear()
                        }
                    }
                );
                response.json({
                    'success' : true,
                    'message' : `Password updation mail send successfull!`
                });
            } else {
                response.json({
                    'success' : false,
                    'message' : `Email not registered`
                });
            }
        } else {
            response.json({
                'success' : false,
                'message' : `Required field 'email' is missing!`
            });
        }
    } catch (error) {
        response.json({
            'success' : false,
            'message' : error
        });
    }

}

/**
 * function to generate the password
 * @param {*} length 
 * @returns 
 */
function generatePassword(length)
{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%'; 
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}