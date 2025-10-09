#!/usr/bin/env node

/**
 * Documentation Validation Script
 * 
 * Validates that all required documentation files exist and contain
 * the necessary sections and content.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const PROJECT_ROOT = path.join(__dirname, '..');

// Required documentation files
const REQUIRED_DOCS = [
  'README.md',
  'architecture.md',
  'components-guidelines.md',
  'contributing.md',
  'api.md'
];

// Required sections in each doc
const REQUIRED_SECTIONS = {
  'README.md': [
    '## Overview',
    '## Quick Start',
    '## Documentation Structure',
    '## Getting Help'
  ],
  'architecture.md': [
    '## System Overview',
    '## Project Structure',
    '## Data Flow',
    '## Key Components'
  ],
  'components-guidelines.md': [
    '## JavaScript Component Standards',
    '## HTML Structure Standards',
    '## CSS Styling Standards',
    '## Code Patterns'
  ],
  'contributing.md': [
    '## Getting Started',
    '## How to Contribute',
    '## Development Workflow',
    '## Pull Request Process'
  ],
  'api.md': [
    '## API Endpoints',
    '## Data Contracts',
    '## Error Handling',
    '## Examples'
  ]
};

let errors = 0;
let warnings = 0;

console.log('🔍 Validating documentation...\n');

// Check if docs directory exists
if (!fs.existsSync(DOCS_DIR)) {
  console.error('❌ Error: docs/ directory does not exist');
  process.exit(1);
}

// Check required documentation files
console.log('📄 Checking required documentation files:');
REQUIRED_DOCS.forEach(docFile => {
  const filePath = path.join(DOCS_DIR, docFile);
  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ Missing: ${docFile}`);
    errors++;
  } else {
    console.log(`  ✅ Found: ${docFile}`);
    
    // Check file is not empty
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.trim().length === 0) {
      console.error(`  ❌ Error: ${docFile} is empty`);
      errors++;
    } else if (content.trim().length < 100) {
      console.warn(`  ⚠️  Warning: ${docFile} is very short (${content.length} chars)`);
      warnings++;
    }
  }
});

console.log('\n📑 Checking required sections:');
Object.entries(REQUIRED_SECTIONS).forEach(([docFile, sections]) => {
  const filePath = path.join(DOCS_DIR, docFile);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`  ${docFile}:`);
    
    sections.forEach(section => {
      if (content.includes(section)) {
        console.log(`    ✅ ${section}`);
      } else {
        console.error(`    ❌ Missing section: ${section}`);
        errors++;
      }
    });
  }
});

// Check main README references docs
console.log('\n📖 Checking main README:');
const mainReadmePath = path.join(PROJECT_ROOT, 'README.md');
if (fs.existsSync(mainReadmePath)) {
  const content = fs.readFileSync(mainReadmePath, 'utf8');
  
  if (content.includes('docs/') || content.includes('[docs]') || content.includes('Documentation')) {
    console.log('  ✅ Main README references documentation');
  } else {
    console.warn('  ⚠️  Warning: Main README does not reference docs/ folder');
    warnings++;
  }
} else {
  console.error('  ❌ Main README.md not found');
  errors++;
}

// Check for broken internal links
console.log('\n🔗 Checking internal documentation links:');
REQUIRED_DOCS.forEach(docFile => {
  const filePath = path.join(DOCS_DIR, docFile);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const linkRegex = /\[.*?\]\((.*?\.md)\)/g;
    let match;
    let linksFound = false;
    
    while ((match = linkRegex.exec(content)) !== null) {
      linksFound = true;
      const linkedFile = match[1];
      const linkedPath = path.join(DOCS_DIR, linkedFile);
      
      if (!fs.existsSync(linkedPath)) {
        console.error(`  ❌ Broken link in ${docFile}: ${linkedFile}`);
        errors++;
      }
    }
    
    if (linksFound) {
      console.log(`  ✅ ${docFile}: Links verified`);
    }
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Validation Summary:');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('✅ All documentation checks passed!');
  console.log('📚 Documentation is complete and well-structured.');
  process.exit(0);
} else {
  console.log(`\n❌ Errors: ${errors}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  
  if (errors > 0) {
    console.error('\n❌ Documentation validation failed!');
    console.error('Please fix the errors above before committing.');
    process.exit(1);
  } else {
    console.warn('\n⚠️  Documentation validation completed with warnings.');
    console.warn('Consider addressing the warnings above.');
    process.exit(0);
  }
}
