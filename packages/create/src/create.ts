import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pc from 'picocolors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateOptions {
  name: string;
  template: 'landing';
  typescript: boolean;
}

export async function create(options: CreateOptions): Promise<void> {
  const { name, template } = options;
  const targetDir = path.resolve(process.cwd(), name);

  console.log();
  console.log(`Creating ${pc.cyan(name)} with template ${pc.green(template)}...`);
  console.log();

  if (fs.existsSync(targetDir)) {
    console.error(pc.red(`Error: Directory ${name} already exists.`));
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const templateDir = path.resolve(__dirname, '..', 'templates', template);

  if (!fs.existsSync(templateDir)) {
    console.error(pc.red(`Error: Template ${template} not found.`));
    process.exit(1);
  }

  copyDir(templateDir, targetDir);

  const pkgPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.name = name;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  console.log(pc.green('Done! Now run:'));
  console.log();
  console.log(`  cd ${name}`);
  console.log('  pnpm install');
  console.log('  pnpm dev');
  console.log();
}

function copyDir(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
