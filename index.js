const express = require('express');
const bodyParser = require('body-parser');
const fetchActivites = require('./fetchActivities');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(cors());


app.use(bodyParser.json());

app.listen(port,()=>{
console.log(`server running on http://localhost:${port}`);
})

app.post('/fetch-activities',async (req,res)=>{
    console.log(`this is my body ${req.body}`);
    const {tenant, bearerToken, apiKey, workspace} = req.body;


    if(!tenant || !bearerToken || !apiKey || !workspace){  // This should probably not happen because frontend handles this
        return res.status(400).json({ error: 'Tenant, bearerToken, apiKey, and workspaceId are required' });
    }

    try{
       await fetchActivites(tenant,bearerToken,apiKey,workspace);
       res.status(200).json({message:"Activities fetched and CSV created"})

    }
    catch(err){
        res.status(500).json({ error: 'Failed to fetch activities' });
    }

})

