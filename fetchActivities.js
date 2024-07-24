const axios = require('axios');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');


const fetchActivities = async (tenant, bearerToken, apiKey, workspaceId)=> {
  
    const apiUrl = `https://mc.adobe.io/${tenant}/target/activities/`;
    const headers= {
        "Authorization": `Bearer ${bearerToken}`,
        "Cache-Control": "no-cache",
        "Accept": "application/vnd.adobe.target.v3+json",
        "x-api-key": apiKey
    }

    try{
        const resposne = await axios.get(apiUrl,{headers});
        const activities = resposne.data.activities;

        const filteredActivities = activities.filter((res)=>res.workspace===workspaceId);

        const abActivities = filteredActivities.filter((res)=res.type==="ab")
        const xtActivities = filteredActivities.filter((res)=res.type==="xt");

        console.log("AB Activities:", abActivities);
        console.log("XT Activities:", xtActivities);

        // Write CSV files
        const abCSV = createObjectCsvWriter({
            path: "ab_activities.csv",
            header: [
                { id: 'id', title: 'activity_id' },
                { id: 'name', title: 'activity_name' },
                { id: 'type', title: 'activity_type' },
                { id: 'state', title: 'activity_state' },
                { id: 'priority', title: 'priority' },
                { id: 'modifiedAt', title: 'modified_at' }
            ]
        });

        const xtCSV = createObjectCsvWriter({
            path: "xt_activities.csv",
            header: [
                { id: 'id', title: 'activity_id' },
                { id: 'name', title: 'activity_name' },
                { id: 'type', title: 'activity_type' },
                { id: 'state', title: 'activity_state' },
                { id: 'priority', title: 'priority' },
                { id: 'modifiedAt', title: 'modified_at' }
            ]
        });

        await abCSV.writeRecords(abActivities);
        await xtCSV.writeRecords(xtActivities);

        console.log("Activities written to CSV files");

    }
    catch(error){
        console.error("Failed to fetch or save activities", err);
    }
    
}

module.exports = fetchActivities