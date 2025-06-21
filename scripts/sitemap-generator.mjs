#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get paths relative to project root
const projectRoot = path.resolve(__dirname, '..');
const pagesDir = path.join(projectRoot, 'src', 'pages');
const publicDir = path.join(projectRoot, 'public');
const staticSeoDir = path.join(projectRoot, 'src', 'static', 'seo');

// Function to get all non-dynamic page routes
const getStaticPaths = () => {
  // Helper function to recursively scan for page files
  const scanPages = (directory, basePath = '') => {
    const files = fs.readdirSync(directory);
    const paths = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const relativePath = path.join(basePath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip special directories like api
        if (file !== 'api' && !file.startsWith('_')) {
          paths.push(...scanPages(filePath, relativePath));
        }
      } else if (
        (file.endsWith('.tsx') ||
          file.endsWith('.ts') ||
          file.endsWith('.jsx') ||
          file.endsWith('.js')) &&
        !file.startsWith('_') &&
        !file.startsWith('[') &&
        file !== '404.tsx'
      ) {
        // Convert file paths to URL paths
        const urlPath = relativePath.replace(/\.(tsx|ts|jsx|js)$/, '');
        if (urlPath === 'index') {
          paths.push('/');
        } else if (basePath && urlPath.endsWith('index')) {
          paths.push(`/${basePath.replace(/\/index$/, '')}`);
        } else {
          paths.push(`/${urlPath}`);
        }
      }
    }

    return paths;
  };

  const paths = scanPages(pagesDir);

  // Handle locale paths
  const localePaths = [];
  const locales = ['en', 'es'];

  paths.forEach(path => {
    if (path.includes('[locale]')) {
      const basePath = path.replace('/[locale]', '');
      locales.forEach(locale => {
        if (basePath === '/') {
          localePaths.push(`/${locale}`);
        } else {
          localePaths.push(`/${locale}${basePath}`);
        }
      });
    } else {
      // Make sure the root URL is properly formatted
      if (path === '/') {
        localePaths.push(path);
      } else {
        localePaths.push(path);
      }
    }
  });

  // Ensure we don't have duplicate root paths or paths with square brackets
  return localePaths.filter(path => !path.includes('['));
};

// Generate the sitemap XML content
const generateSitemapXml = (baseUrl, paths) => {
  const date = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths
    .map(path => {
      // Ensure no double slashes by handling the root URL properly
      const formattedPath = path === '/' ? '' : path;
      return `
  <url>
    <loc>${baseUrl}${formattedPath}/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;
};

// Main function to generate and save the sitemap
const generateSitemap = () => {
  try {
    console.log('Generating sitemap...');

    const baseUrl = 'https://crisoldecuerda.com';
    let paths = getStaticPaths();

    // Ensure we have the root URL and language-specific home URLs
    const hasRoot = paths.includes('/');
    const hasEnHome = paths.includes('/en');
    const hasEsHome = paths.includes('/es');

    if (!hasRoot) {
      paths.push('/');
      console.log('Added missing root URL (/) to sitemap');
    }

    if (!hasEnHome) {
      paths.push('/en');
      console.log('Added missing English home URL (/en) to sitemap');
    }

    if (!hasEsHome) {
      paths.push('/es');
      console.log('Added missing Spanish home URL (/es) to sitemap');
    }
    // Clean up paths to ensure no malformed URLs
    paths = paths.map(p => {
      // Remove any double slashes
      return p.replace(/\/\//g, '/');
    });

    // Sort paths for better readability
    paths.sort((a, b) => {
      // Root URL first
      if (a === '/') return -1;
      if (b === '/') return 1;
      // Language roots next
      if (a === '/en' || a === '/es') return -1;
      if (b === '/en' || b === '/es') return 1;
      // Then alphabetical
      return a.localeCompare(b);
    });

    // Display the first few and the last few paths for debugging
    console.log('First 3 paths:');
    paths.slice(0, 3).forEach(p => console.log(`  - ${baseUrl}${p === '/' ? '' : p}/`));
    console.log('Last 3 paths:');
    paths.slice(-3).forEach(p => console.log(`  - ${baseUrl}${p === '/' ? '' : p}/`));

    const sitemapContent = generateSitemapXml(baseUrl, paths);

    // Write the sitemap to the public directory
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log(`Created public directory: ${publicDir}`);
    }
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);

    // Also write to the out directory if it exists
    const outDir = path.join(projectRoot, 'out');
    if (fs.existsSync(outDir)) {
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapContent);
      console.log(`Sitemap also copied to: ${path.join(outDir, 'sitemap.xml')}`);
    }

    console.log(`Sitemap generated successfully with ${paths.length} URLs!`);
    console.log(`Sitemap saved to: ${path.join(publicDir, 'sitemap.xml')}`);

    // Copy robots.txt from source to output directories
    const sourceRobotsTxtPath = path.join(staticSeoDir, 'robots.txt');
    const publicRobotsTxtPath = path.join(publicDir, 'robots.txt');

    if (fs.existsSync(sourceRobotsTxtPath)) {
      // Copy to public directory
      fs.copyFileSync(sourceRobotsTxtPath, publicRobotsTxtPath);
      console.log(`robots.txt copied from source to: ${publicRobotsTxtPath}`);

      // Also copy to the out directory if it exists
      if (fs.existsSync(outDir)) {
        const outRobotsTxtPath = path.join(outDir, 'robots.txt');
        fs.copyFileSync(sourceRobotsTxtPath, outRobotsTxtPath);
        console.log(`robots.txt also copied to: ${outRobotsTxtPath}`);
      }
    } else {
      console.warn(`Source robots.txt not found at ${sourceRobotsTxtPath}. Skipping copy.`);
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
};

// Execute the sitemap generation
generateSitemap();
