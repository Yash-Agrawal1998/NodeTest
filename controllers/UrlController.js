const  shortId  = require('shortid');
const urlCollection = require('../models/url');

async function generateShortHandUrl(request, response)
{
    requestData = request.body;
    const shortIdData = shortId();
    let responseData = {};
    try {
        if (requestData.url) {
            result = await urlCollection.create(
                {
                    short_id : shortIdData,
                    redirect_url : requestData.url
                }
            );
            responseData = {
                'success' : true,
                'short_id' : shortIdData
            };
        } else {
            responseData = {
                'success' : false,
                'message' : 'url is required data'
            };
        }
       
    } catch (error) {
        responseData = {
            'success' : false,
            'short_id' : error
        };
    }
    response.json(responseData);
}


async function getStoredUrl(request, response)
{
    let data = await urlCollection.find();
    response.json({
        'success' : true,
        'short_id' : data
    });
}

async function getShortUrlById(request, response)
{
    let short_id = request.params.id;
    try {
        let urlData = await urlCollection.findOneAndUpdate(
            {
                short_id
            },
            {
                $push : {
                    visit_history : {
                        time_stamp : Date.now()
                    }
                }
            }
        );
        response.redirect(urlData.redirect_url);
    } catch(error) {
        response.json({
            'success' : false,
            'message' : error
        });
    }
}

async function getAnalyticsData(request, response)
{
    let short_id = request.params.id;
    try {
        let urlData = await urlCollection.findOne({short_id});
        response.json({
            'success' : true,
            'data' : {
                'total_clicks' : urlData.visit_history.length,
                'analytics' : urlData.visit_history
            }
        });
    } catch(error) {
        response.json({
            'success' : false,
            'message' : error
        });
    }
}

module.exports = {
    generateShortHandUrl,
    getStoredUrl,
    getShortUrlById,
    getAnalyticsData
}