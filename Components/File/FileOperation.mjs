import fileSystem from 'node:fs';
import path from 'path';


export function readFileData(filePath = '')
{
    let response = '';
    if (filePath) {
        try {
            filePath = path.resolve(filePath);
            response = fileSystem.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error('Error',err);
        }
    } else {
        response = `'filePath' is required to read the data from file!`
    }
    return response;
}
