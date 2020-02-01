import commander from 'commander';
import { startDevServer } from './commands/dev';
import path from 'path';
import { addPackage, removePackage, generateModules } from './commands/pkg';

const program = new commander.Command('journey')
    .version('1.0.0')
    .option('--path <path>', 'Path to project');

// Dev server packages
program.command('dev <module>')
    .description('start a dev server')
    .action((pkg) => {
        let p = (program as any).path ?  path.resolve(((program as any).path as string)) : process.cwd()
        startDevServer(p, pkg);
    });

// Modules
program.command('add <module>')
    .description('Add module')
    .action((pkg) => {
        let p = (program as any).path ?  path.resolve(((program as any).path as string)) : process.cwd()
        addPackage(p, pkg);
    });

program.command('remove <module>')
    .description('Remove module')
    .action((pkg) => {
        let p = (program as any).path ?  path.resolve(((program as any).path as string)) : process.cwd()
        removePackage(p, pkg);
    });

program.command('refresh')
    .description('Refresh configs')
    .action(() => {
        let p = (program as any).path ?  path.resolve(((program as any).path as string)) : process.cwd()
        generateModules(p);
    });
// Parse Arguments
program.parse(process.argv);

// Default help
if (program.args.length === 0) {
  program.help();
}