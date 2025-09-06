#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up 3D Portfolio...\n');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!\n');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed!\n');
}

// Create placeholder resume file
const resumePath = 'public/resume.pdf';
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

if (!fs.existsSync(resumePath)) {
  console.log('📄 Creating placeholder resume file...');
  // Create a simple placeholder PDF or text file
  fs.writeFileSync(resumePath, 'Placeholder resume file. Replace with your actual resume PDF.');
  console.log('✅ Placeholder resume created!\n');
}

console.log('🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Customize the content in the component files');
console.log('4. Replace the placeholder resume with your actual resume PDF');
console.log('\n📖 Check README.md for detailed customization instructions');
console.log('\nHappy coding! 🚀');
