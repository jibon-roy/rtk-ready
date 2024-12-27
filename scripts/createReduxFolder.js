// scripts/createReduxFolder.js
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const reduxPath = path.join(projectRoot, 'redux');
const templatePath = path.join(__dirname, '../src/redux'); // Adjust if needed

// Copy folder and its contents recursively
function copyFolderSync(from, to) {
  try {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach((element) => {
      const fromPath = path.join(from, element);
      const toPath = path.join(to, element);
      const stat = fs.lstatSync(fromPath);
      if (stat.isFile()) {
        fs.copyFileSync(fromPath, toPath);
      } else if (stat.isDirectory()) {
        copyFolderSync(fromPath, toPath);
      }
    });
  } catch (error) {
    console.error(`Error copying folder: ${error.message}`);
    process.exit(1); // Exit with failure if copying fails
  }
}

function createReduxFolder() {
  try {
    if (!fs.existsSync(reduxPath)) {
      console.log('Creating Redux folder...');
      copyFolderSync(templatePath, reduxPath);
      console.log('Redux folder created.');
    } else {
      console.log('Redux folder already exists. Skipping.');
    }
  } catch (error) {
    console.error(`Error creating Redux folder: ${error.message}`);
    process.exit(1); // Exit with failure if the folder creation fails
  }
}

createReduxFolder();
