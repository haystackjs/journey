import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import { loadConfig, saveConfig } from './config';
import { updateTypescriptPaths } from './modules/TypescriptPaths';
import { createTemplate } from './modules/Template';

//
// Generate
//

export function generateModules(root: string) {
    let config = loadConfig(root);
    updateTypescriptPaths(root, config);
}

//
// Commands
//

export function addPackage(root: string, name: string) {
    if (name.toLowerCase() !== name) {
        console.error(chalk.red('Module name ("' + name + '") must be lowercase'));
        return;
    }

    // Update Config
    let config = loadConfig(root);
    for (let m of config.modules) {
        if (m === name) {
            console.error(chalk.red('Module "' + name + '" already exist'));
            return;
        }
    }
    if (fs.existsSync(path.join(root, 'packages', name))) {
        throw Error('Path ' + name + ' already exists');
    }

    let updatedConfig = { ...config, modules: [...config.modules, name] };

    // Save Config
    saveConfig(root, updatedConfig);

    // Create folder
    createTemplate(root, name);

    // Generate modules
    generateModules(root);
}

export function removePackage(root: string, name: string) {

    // Update Config
    let exists = false;
    let config = loadConfig(root);
    for (let m of config.modules) {
        if (m === name) {
            exists = true;
        }
    }
    if (!exists) {
        console.error(chalk.red('Module "' + name + '" does not exist'));
        return;
    }
    let updatedConfig = { ...config, modules: config.modules.filter((v) => v !== name) };

    // Save Config
    saveConfig(root, updatedConfig);

    // Clear directory
    rimraf.sync(path.join(root, name));

    // Generate modules
    generateModules(root);
}