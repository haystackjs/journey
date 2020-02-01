import path from 'path';
import fs from 'fs';

export function createTemplate(root: string, name: string) {
    if (!fs.existsSync(path.join(root, 'packages'))) {
        fs.mkdirSync(path.join(root, 'packages'));
    }
    fs.mkdirSync(path.join(root, 'packages', name));
    fs.writeFileSync(path.join(root, 'packages', name, 'package.json'), JSON.stringify({
        "name": name,
        "version": "1.0.0",
        "main": "lib/index.js",
        "typings": "lib/index.d.ts",
        "dependencies": {}
    }, null, 2));
    fs.writeFileSync(path.join(root, 'packages', name, 'index.ts'), '');
}