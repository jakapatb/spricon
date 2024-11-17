import { Command } from 'commander';
import prompts from 'prompts';
import { optimize } from 'svgo';

const program = new Command();

program
  .name('spricon')
  .description('A tool to bundle sprite icons into a single file')
  .version('1.0.0');

program.parse(process.argv);

program.action(async () => {
  const config = await import(process.cwd() + '/sprite-icon.config.ts').then(
    (module) => module.default,
  );
  console.log(config);
});
