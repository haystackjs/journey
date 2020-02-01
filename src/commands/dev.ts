import { startWebpackServer } from "./dev/WebpackServer";

export function startDevServer(root: string, name: string) {
    startWebpackServer(root, name);
}