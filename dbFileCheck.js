import fs from 'fs';
import { exit } from 'process';

export default async function dbFileCheck() {
    let fileExist = fs.existsSync('db.json');
    if (!fileExist) {
        console.log('File is not available!');
        exit(1);
    }
}
