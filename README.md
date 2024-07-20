
# Bulk Delete Target Activities

**Disclaimer:** This script is a workaround for deleting Target activities in bulk. Adobe Target does not have an official bulk delete API yet, so I've created this solution. **Use with caution!** If you accidentally delete the wrong activities, **I'm not responsible for bringing down your entire company**. Proceed at your own risk!

## How to Use

1. **Install Node.js**

   Ensure you have Node.js installed. If not, [download and install it here](https://nodejs.org/).

2. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   
**Install Dependencies**


**npm install**

**Fetch Activities**

Run the following command to create CSV files for activities:

**node fetch**

**This command generates two CSV files:**

ab_activities.csv for A/B activities
xt_activities.csv for XT activities
Currently, only A/B and XT activities are supported. If I have time in the future, I'll add support for additional activity types.

Edit CSV Files

Open the generated CSV files and keep only the activities you want to delete. Be very careful—do not delete everything. I'm not responsible for any unintended consequences.

**Delete Activities**

**Run the following command to start the bulk delete process:**

**node delete**

You will be prompted to enter the path of the CSV file. Provide the file name along with its extension **(e.g., ab_activities.csv).** The script will then perform the bulk delete operation.

**Warning: Ensure that the CSV file contains only the activities you want to delete. Any mistakes could lead to unintended disasters.**

Again, proceed with caution—only keep the activities you want to delete in the CSV file. Any other data in the file will be ignored.

Files
fetch.js - Script to fetch and save activities to CSV files.
delete.js - Script to delete activities based on the CSV file.
