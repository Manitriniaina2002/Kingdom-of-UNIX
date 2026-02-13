const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'node_modules/expo-sqlite/build');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
let fixed = 0;
for (const file of files) {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');
  // Add .js extension to relative imports like from './Module'
  const newContent = content.replace(/from '\.\/(\w+)'/g, function(match, name) {
    return "from './" + name + ".js'";
  });
  if (content !== newContent) {
    fs.writeFileSync(fp, newContent);
    console.log('Fixed:', file);
    fixed++;
  }
}

// Also fix the legacy directory
const legacyDir = path.join(dir, 'legacy');
if (fs.existsSync(legacyDir)) {
  const legacyFiles = fs.readdirSync(legacyDir).filter(f => f.endsWith('.js'));
  for (const file of legacyFiles) {
    const fp = path.join(legacyDir, file);
    let content = fs.readFileSync(fp, 'utf8');
    const newContent = content.replace(/from '\.\/(\w+)'/g, function(match, name) {
      return "from './" + name + ".js'";
    });
    if (content !== newContent) {
      fs.writeFileSync(fp, newContent);
      console.log('Fixed (legacy):', file);
      fixed++;
    }
  }
}

console.log('Total files fixed:', fixed);
