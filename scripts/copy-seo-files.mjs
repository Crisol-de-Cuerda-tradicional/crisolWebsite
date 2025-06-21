#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get paths relative to project root
const projectRoot = path.resolve(__dirname, '..');
const staticSeoDir = path.join(projectRoot, 'src', 'static', 'seo');
const publicDir = path.join(projectRoot, 'public');
const outDir = path.join(projectRoot, 'out');

/**
 * Copy SEO files (robots.txt, etc.) from source to output directories
 */
const copySeoFiles = () => {
  try {
    console.log('Copying SEO files...');

    // Make sure the public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log(`Created public directory: ${publicDir}`);
    }

    // Copy robots.txt
    const sourceRobotsTxtPath = path.join(staticSeoDir, 'robots.txt');
    if (fs.existsSync(sourceRobotsTxtPath)) {
      // Copy to public directory
      const publicRobotsTxtPath = path.join(publicDir, 'robots.txt');
      fs.copyFileSync(sourceRobotsTxtPath, publicRobotsTxtPath);
      console.log(`robots.txt copied to: ${publicRobotsTxtPath}`);

      // Also copy to the out directory if it exists
      if (fs.existsSync(outDir)) {
        const outRobotsTxtPath = path.join(outDir, 'robots.txt');
        fs.copyFileSync(sourceRobotsTxtPath, outRobotsTxtPath);
        console.log(`robots.txt also copied to: ${outRobotsTxtPath}`);
      }
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
