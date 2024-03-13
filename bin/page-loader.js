#!/usr/bin/env node
import { Command } from 'commander';
import load from '../src/index.js';

const run = () => {
  const program = new Command();

  program
    .name('page-loader')
    .description('Page loader utility')
    .version('1.0.0')
    .argument('<url>')
    .option('-o, --output [dir]', 'output dir (default: "/home/user/current-dir")')
    .action((url) => {
      const outputDir = program.opts().output;
      load(url, outputDir)
        .then(() => {
          console.log(`The page ${url} has been loaded successfully into ${outputDir}`);
          process.exit(0);
        })
        .catch((e) => {
          console.error(`The page loading process has failed:\n${e}`);
          process.exit(1);
        });
    });

  program.parse();
};

run();
