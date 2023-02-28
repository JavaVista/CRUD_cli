import inquirer from 'inquirer';
import fs from 'fs';
import queryDB from './queryDB.js';
import dbFileCheck from './dbFileCheck.js';

export default async function removeData(info) {
    dbFileCheck();

    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Please, enter the record Id:',
            },
        ]);

        let remanentData = [];
        info.forEach(element => {
            if (element.id !== answer.id) {
                remanentData.push(element);
            }
        });

        await fs.writeFile('db.json', JSON.stringify(remanentData), function(error) {
            if (error) {
                console.log('Error updating database.');
            }
            console.log('Record was successfully deleted!');
        });
        
    } catch (error) {
        console.log('Something went wrong', error);
    }
}

queryDB(removeData);