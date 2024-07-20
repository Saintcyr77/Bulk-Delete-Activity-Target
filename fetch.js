const axios  = require("axios");
const fs = require("fs");
const { createObjectCsvWriter } = require('csv-writer');
const { log } = require("console");
const tenant = "acsultimatesupport"
const apiURL = `https://mc.adobe.io/${tenant}/target/activities/`
require('dotenv').config();

const headers = {
    "Authorization": `Bearer ${process.env.BEARER_TOKEN} `,
    "Cache-Control": "no-cache",
    "Accept": "application/vnd.adobe.target.v3+json",
    "x-api-key": process.env.API_KEY
}

const fetching  = async ()=>{
    try{
        const response  = await axios.get(apiURL, {headers});
        const activities = response.data.activities;
    
        const ab = activities.filter((res)=>res.type==="ab");
        const xt = activities.filter((res)=>res.type==="xt");

        console.log(ab);
        console.log(xt);
    
        const abCSV = createObjectCsvWriter({
            path: "ab_activities.csv",
            header: [
                { id: 'id', title: 'activity_id' },
                { id: 'name', title: 'activity_name' },
                { id: 'type', title: 'activity_type' },
            ]
        })
        const xtCSV = createObjectCsvWriter({
            path: "xt_activities.csv",
            header: [
                { id: 'id', title: 'activity_id' },
                { id: 'name', title: 'activity_name' },
                { id: 'type', title: 'activity_type' },
            ]
        })
    
        await abCSV.writeRecords(ab);
        await xtCSV.writeRecords(xt);
    
        console.log("Activities written");
    }
    catch(err){
        console.log("Failed to save",err);

    }
   


}

fetching();