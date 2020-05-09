import 'child_process';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export default async (request, response) => {

    // Execute the command to regenerate your site
    const output = execSync(`npm run build`)
        .toString()
        .trim();

    // Once building has finished, update the .rebuilt file -- pm2 will restart due to watching .rebuilt file
    const writePath = path.join(process.cwd(), '.rebuilt');
    fs.writeFile(writePath, `Site rebuilt at ${Date.now()}`, (error) => {
        if (error) console.log(error);
        console.log('File is created successfully.');
    });

    response.end(`Building has finished`);
}