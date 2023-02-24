import inquirer from 'inquirer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import queryDB from './queryDB.js';

export default async function addData(info) {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Please, enter your name:',
            },
            {
                type: 'number',
                name: 'phone',
                message: 'Please, enter your phone number:',
            },
            {
                type: 'list',
                name: 'age',
                message: 'Are you an Adult?',
                choices: [
                    { name: 'Y', value: 'Adult' },
                    { name: 'N', value: 'Minor' },
                ],
            },
        ]);

        const data = {
            id: uuidv4(),
            name: answer.name,
            phoneNumber: answer.phone,
            age: answer.age,
        };
        info.push(data);

        if (fs.existsSync('db.json')) {
            addDetails(info);
        } else {
            fs.appendFile('db.json', '[]', function (error) {
                if (error) {
                    console.log('Creating file failed.');
                }
            });
            console.log('db.json file was successfully created!');
            addDetails(info);
        }
    } catch (error) {
        console.log('Something went wrong', error);
    }
}

async function addDetails(info) {
    await fs.writeFile('db.json', JSON.stringify(info), function (error) {
        if (error) {
            console.log('Error writing to the database file');
        }
        console.log('Data was successfully added!');
    });
}

queryDB(addData);
