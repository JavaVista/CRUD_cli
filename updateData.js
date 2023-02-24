import inquirer from 'inquirer';
import fs from 'fs';
import queryDB from './queryDB.js';
import dbFileCheck from './dbFileCheck.js';

export default async function updateData(info) {
    dbFileCheck();

    try {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Please, enter the record Id:',
            },
        ]);

        let user;
        info.forEach(element => {
            if (element.id === answer.id) {
                user = element;

                updateDetails(user, info);
            }
        });
    } catch (error) {
        console.log('Something went wrong', error);
    }
}

async function updateDetails(user, info) {
    try {
        const feedback = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                default: user.name,
                message: 'Please, enter your name:',
            },
            {
                type: 'number',
                name: 'phone',
                default: user.phoneNumber,
                message: 'Please, enter your phone number:',
            },
            {
                type: 'list',
                name: 'age',
                default: user.age,
                message: 'Are you an Adult?',
                choices: [
                    { name: 'Y', value: 'Adult' },
                    { name: 'N', value: 'Minor' },
                ],
            },
        ]);

        user.name = feedback.name;
        user.phoneNumber = feedback.phone;
        user.age = feedback.age;

        await fs.writeFile('db.json', JSON.stringify(info), function (error) {
            if (error) {
                console.log('Error updating database.');
            }
            console.log('User was updated successfully!');
        });
    } catch (error) {
        console.log('Something went wrong', error);
    }
}

queryDB(updateData);
