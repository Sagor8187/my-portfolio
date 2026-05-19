const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace hardcoded white colors with foreground to support light mode
  content = content.replace(/border-white\//g, 'border-foreground/');
  content = content.replace(/bg-white\//g, 'bg-foreground/');
  content = content.replace(/text-white([^A-Za-z0-9_-])/g, 'text-foreground$1');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
