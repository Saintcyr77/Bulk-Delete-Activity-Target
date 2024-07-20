const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');
require('dotenv').config();

const tenant = "acsultimatesupport";
const deleteAbUrl = `https://mc.adobe.io/${tenant}/target/activities/ab/`;
const deleteXtUrl = `https://mc.adobe.io/${tenant}/target/activities/xt/`;
const bearer = process.env.BEARER_TOKEN;
const key =  process.env.API_KEY

const headers = {
  'Authorization': `Bearer ${bearer}`,
  'Cache-Control': 'no-cache',
  'Accept': 'application/vnd.adobe.target.v3+json',
  'x-api-key': `${key}`
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the path of the CSV file: ', (csvFilePath) => {
  if (!fs.existsSync(csvFilePath)) {
    console.log('File does not exist.');
    rl.close();
    return;
  }

  const deleteActivity = async (activityId, activityType) => {
    let deleteUrl = '';
    if (activityType === 'ab') {
      deleteUrl = deleteAbUrl + activityId;
    } else if (activityType === 'xt') {
      deleteUrl = deleteXtUrl + activityId;
    } else {
      console.log(`Unknown activity type for ID: ${activityId}`);
      return;
    }

    try {
      console.log(`Deleting activity with ID: ${activityId} using URL: ${deleteUrl}`);
      console.log(`Headers: `, headers);
      const response = await axios.delete(deleteUrl, { headers });
      console.log(`Deleted activity with ID: ${activityId}, Status: ${response.status}`);
    } catch (error) {
      console.error(`Failed to delete activity with ID: ${activityId}`, error.response ? error.response.data : error.message);
    }
  };

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      await deleteActivity(row.activity_id, row.activity_type);
    })
    .on('end', () => {
      console.log('Completed processing CSV file.');
      rl.close();
    });
});
