import { ModulesConfig } from "../config";
import fs from 'fs';
import path from 'path';

function readTsConfig(root: string) {
    let res: any = {};
    let filePath = path.join(root, 'tsconfig.json');
    if (fs.existsSync(filePath)) {
        res = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return res;
}

function writeTsConfig(root: string, ts: any) {
    let filePath = path.join(root, 'tsconfig.json');
    fs.writeFileSync(filePath, JSON.stringify(ts, null, 4));
}

export function updateTypescriptPaths(root: string, config: ModulesConfig) {
    let ts = readTsConfig(root);
    let compilerOptions = ts.compilerOptions || {};
    let paths = {};
    for (let m of config.modules) {
        paths[m] = [m];
    }
    compilerOptions = { ...compilerOptions, baseUrl: './packages', paths: paths };
    ts = { ...ts, compilerOptions };
    writeTsConfig(root, ts);
}