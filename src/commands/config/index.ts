import fs from 'fs';
import path from 'path';

export interface ModulesConfig {
    modules: string[];
}

export function loadConfig(root: string) {
    let config: ModulesConfig = { modules: [] };
    let filePath = path.join(root, 'journey.json');
    if (fs.existsSync(filePath)) {
        config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return config;
}

export function saveConfig(root: string, config: ModulesConfig) {
    let filePath = path.join(root, 'journey.json');
    fs.writeFileSync(filePath, JSON.stringify(config, null, 4));
}