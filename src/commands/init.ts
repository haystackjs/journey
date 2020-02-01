import path from 'path';
import fs from 'fs';
import child from 'child-process-promise';

export async function doInit(root: string, name: string, version: string) {

    // package.json
    console.log('Generate package.json');
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({
        name: name,
        version: '1.0.0',
        devDependencies: {
            '@types/react': '^16.9.19',
            '@types/react-dom': '^16.9.5',
            'react': '^16.12.0',
            'react-dom': '^16.12.0',
            '@haystackjs/journey': version
        },
        dependencies: {
            'typescript': '*'
        }
    }, null, 2));

    // tslint.json
    console.log('Generate tslint.json');
    fs.writeFileSync(path.join(root, 'tslint.json'), JSON.stringify({}, null, 2));

    // journey.json
    console.log('Generate journey.json');
    fs.writeFileSync(path.join(root, 'journey.json'), JSON.stringify({ modules: [] }, null, 2));

    // Install Deps
    console.log('Instal dependencies...');
    process.chdir(root);
    let cp = await child.exec('yarn');
    console.log(cp.stdout);
}