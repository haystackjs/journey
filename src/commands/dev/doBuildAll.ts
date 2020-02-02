import { loadConfig } from "../config";
import child from 'child-process-promise';
import rimraf from 'rimraf';
import path from 'path';
import ncp from 'ncp';

export async function doBuildAll(root: string) {
    const journeyConfig = loadConfig(root);

    // Delete old build
    console.log('Prepare...');
    for (let m of journeyConfig.modules) {
        rimraf.sync(path.join(root, 'packages', m, 'lib'));
    }

    // Build
    console.log('Building...');
    process.chdir(root);
    let cp = await child.exec('yarn tsc');
    console.log(cp.stdout);

    console.log('Copying...');
    for (let m of journeyConfig.modules) {
        // Copy Sources
        await new Promise((resolve) => ncp(path.join(root, 'packages', m, 'src'), path.join(root, 'packages', m, 'lib'), (e) => {
            resolve();
        }));
        // Copy compilation result
        await new Promise((resolve) => ncp(path.join(root, 'output', m, 'src'), path.join(root, 'packages', m, 'lib'), (e) => {
            resolve();
        }));
    }
    // Clean output
    // rimraf.sync(path.join(root, 'output'));
}

export async function doCleanAll(root: string) {
    const journeyConfig = loadConfig(root);
    rimraf.sync(path.join(root, 'output'));
    for (let m of journeyConfig.modules) {
        rimraf.sync(path.join(root, 'packages', m, 'lib'));
    }
}