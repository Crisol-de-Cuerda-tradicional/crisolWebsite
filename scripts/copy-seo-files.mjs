#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get paths relative to project root
const projectRoot = path.resolve(__dirname, '..');
const staticSeoDir = path.join(projectRoot, 'src', 'static', 'seo');
const outDir = path.join(projectRoot, 'out');

/**
 * Copy SEO files (robots.txt, etc.) from source to output directories
 */
const copySeoFiles = () => {
  try {
    console.log('Copying SEO files...');

    // Make sure the out directory exists
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
      console.log(`Created output directory: ${outDir}`);
    }

    // Copy robots.txt
    const sourceRobotsTxtPath = path.join(staticSeoDir, 'robots.txt');
    if (fs.existsSync(sourceRobotsTxtPath)) {
      // Copy directly to the out directory
      const outRobotsTxtPath = path.join(outDir, 'robots.txt');
      fs.copyFileSync(sourceRobotsTxtPath, outRobotsTxtPath);
      console.log(`robots.txt copied to: ${outRobotsTxtPath}`);
    } else {
      console.error(`Source robots.txt not found at ${sourceRobotsTxtPath}`);
      process.exit(1);
    }

    // Add other SEO files here if needed

    console.log('SEO files copied successfully!');
  } catch (error) {
    console.error('Error copying SEO files:', error);
    process.exit(1);
  }
};

// Execute the file copy
copySeoFiles();
