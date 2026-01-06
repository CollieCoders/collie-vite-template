#!/usr/bin/env node
/**
 * use-local-collie.mjs
 * 
 * Installs locally-built @collie-lang packages from tarballs produced by
 * the collie monorepo's `pnpm local:pack` command.
 * 
 * Usage:
 *   npm run local:collie:use
 *   node scripts/use-local-collie.mjs --manifest ../collie/.local-packs/manifest.json
 *   node scripts/use-local-collie.mjs --manifest ../collie/.local-packs/manifest.json --clean
 * 
 * The --clean flag removes node_modules and package-lock.json before installing.
 */

import { readFileSync, existsSync, rmSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// Parse CLI args
const args = process.argv.slice(2);
let manifestPath = null;
let cleanFirst = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--manifest' && i + 1 < args.length) {
    manifestPath = args[i + 1];
    i++;
  } else if (args[i] === '--clean') {
    cleanFirst = true;
  }
}

if (!manifestPath) {
  console.error('❌ Missing --manifest argument');
  console.error('Usage: node scripts/use-local-collie.mjs --manifest <path-to-manifest.json>');
  process.exit(1);
}

// Resolve manifest path relative to project root
const resolvedManifestPath = resolve(projectRoot, manifestPath);

if (!existsSync(resolvedManifestPath)) {
  console.error(`❌ Manifest not found: ${resolvedManifestPath}`);
  console.error('');
  console.error('Make sure you have run `pnpm local:pack` in the collie monorepo first.');
  process.exit(1);
}

console.log('🎯 Installing local Collie packages\n');
console.log(`   Manifest: ${resolvedManifestPath}\n`);

// Read manifest
let manifest;
try {
  const manifestContent = readFileSync(resolvedManifestPath, 'utf-8');
  manifest = JSON.parse(manifestContent);
} catch (error) {
  console.error(`❌ Failed to read manifest: ${error.message}`);
  process.exit(1);
}

// Categorize packages by dependency type
const RUNTIME_PACKAGES = ['@collie-lang/react'];
const BUILD_TIME_PACKAGES = ['@collie-lang/vite'];

const runtimeTarballs = [];
const buildTimeTarballs = [];

for (const [pkgName, pkgInfo] of Object.entries(manifest)) {
  const tarballPath = pkgInfo.path;
  
  if (!existsSync(tarballPath)) {
    console.error(`❌ Tarball not found: ${tarballPath}`);
    process.exit(1);
  }

  if (RUNTIME_PACKAGES.includes(pkgName)) {
    runtimeTarballs.push(tarballPath);
  } else if (BUILD_TIME_PACKAGES.includes(pkgName)) {
    buildTimeTarballs.push(tarballPath);
  }
}

// Clean if requested
if (cleanFirst) {
  console.log('🧹 Cleaning node_modules and package-lock.json...\n');
  
  const nodeModulesPath = join(projectRoot, 'node_modules');
  const lockFilePath = join(projectRoot, 'package-lock.json');
  
  if (existsSync(nodeModulesPath)) {
    rmSync(nodeModulesPath, { recursive: true, force: true });
    console.log('   ✓ Removed node_modules');
  }
  
  if (existsSync(lockFilePath)) {
    rmSync(lockFilePath, { force: true });
    console.log('   ✓ Removed package-lock.json');
  }
  
  console.log('');
}

// Install packages
try {
  if (runtimeTarballs.length > 0) {
    console.log('📦 Installing runtime dependencies...\n');
    const cmd = `npm install ${runtimeTarballs.join(' ')}`;
    console.log(`   $ ${cmd}\n`);
    execSync(cmd, { cwd: projectRoot, stdio: 'inherit' });
    console.log('');
  }

  if (buildTimeTarballs.length > 0) {
    console.log('🔧 Installing build-time dependencies...\n');
    const cmd = `npm install -D ${buildTimeTarballs.join(' ')}`;
    console.log(`   $ ${cmd}\n`);
    execSync(cmd, { cwd: projectRoot, stdio: 'inherit' });
    console.log('');
  }

  console.log('✅ Done! Local Collie packages installed.\n');
  console.log('You can now run `npm run dev` to test your changes.\n');
} catch (error) {
  console.error('❌ Installation failed');
  process.exit(1);
}
