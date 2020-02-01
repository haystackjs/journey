import { startWebpackServer, exportStatic } from "./dev/WebpackServer";

export function startDevServer(root: string, name: string) {
    startWebpackServer(root, name);
}

export function exportDevServer(root: string, name: string) {
    exportStatic(root, name);
}