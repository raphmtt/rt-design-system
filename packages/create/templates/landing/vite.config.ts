import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Rebuilds `src/generated/themes` from `themes/*.theme.rtds.json`. */
function rtdsTheme(): Plugin {
  const run = () => {
    const cli = fileURLToPath(import.meta.resolve('@rtds/tokens/cli'));
    execFileSync(
      process.execPath,
      [cli, '--in', 'themes', '--out', 'src/generated/themes', '--no-playground'],
      { stdio: 'inherit' }
    );
  };

  return {
    name: 'rtds-theme',
    buildStart: run,
    configureServer(server) {
      server.watcher.add(path.resolve('themes'));
      server.watcher.on('change', (file) => {
        if (file.endsWith('.theme.rtds.json')) {
          run();
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [rtdsTheme(), react(), tailwindcss()],
});
