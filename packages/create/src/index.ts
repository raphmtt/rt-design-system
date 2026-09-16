#!/usr/bin/env node

import { program } from 'commander';
import { create } from './create.js';

program
  .name('create-acme')
  .description('Scaffold a new Acme design system project')
  .version('0.1.0');

program
  .command('landing')
  .description('Create a new landing page project')
  .argument('[name]', 'Project name', 'my-landing')
  .option('--typescript', 'Use TypeScript', true)
  .option('--no-typescript', 'Use JavaScript')
  .action(async (name: string, options: { typescript: boolean }) => {
    await create({
      name,
      template: 'landing',
      typescript: options.typescript,
    });
  });

program.parse();
