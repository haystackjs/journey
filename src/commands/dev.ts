import { startWebpackServer, exportStatic } from "./dev/WebpackServer";
import { doBuildAll, doCleanAll } from "./dev/doBuildAll";

export function startDevServer(root: string, name: string) {
    startWebpackServer(root, name);
}

export function exportDevServer(root: string, name: string) {
    exportStatic(root, name);
}

export async function buildAll(root: string) {
    await doBuildAll(root);
}

export async function cleanAll(root: string) {
    await doCleanAll(root);
}