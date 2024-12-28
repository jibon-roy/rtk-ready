#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const reduxPath = path.join(projectRoot, 'src/redux'); // Destination folder for the Redux setup
const templatePath = path.join(
  projectRoot,
  './node_modules/rtk-ready/src/redux'
); // Source folder where the template is located

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.error(`Source folder does not exist: ${from}`);
    return;
  }

  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function createReduxFolder() {
  // Check if the source folder (template) exists
  if (!fs.existsSync(templatePath)) {
    console.error(
      'Template folder does not exist. Please ensure the src/redux-template folder exists.'
    );
    return;
  }

  // Check if the destination folder (redux) exists
  if (!fs.existsSync(reduxPath)) {
    console.log('Creating Redux folder...');
    copyFolderSync(templatePath, reduxPath);
    console.log('Redux folder created.');
  } else {
    console.log('Redux folder already exists. Skipping.');
  }
}

createReduxFolder();
