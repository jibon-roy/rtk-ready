#!/usr/bin/env node

// import fs from 'fs';
// import path from 'path';

// const projectRoot = process.cwd();
// const reduxPath = path.join(projectRoot, 'src/redux'); // Destination folder for the Redux setup
// const templatePath = path.join(
//   projectRoot,
//   './node_modules/rtk-ready/src/redux'
// ); // Source folder where the template is located

// function copyFolderSync(from, to) {
//   if (!fs.existsSync(from)) {
//     console.error(`Source folder does not exist: ${from}`);
//     return;
//   }

//   fs.mkdirSync(to, { recursive: true });
//   fs.readdirSync(from).forEach((element) => {
//     const stat = fs.lstatSync(path.join(from, element));
//     if (stat.isFile()) {
//       fs.copyFileSync(path.join(from, element), path.join(to, element));
//     } else if (stat.isDirectory()) {
//       copyFolderSync(path.join(from, element), path.join(to, element));
//     }
//   });
// }

// function createReduxFolder() {
//   // Check if the source folder (template) exists
//   if (!fs.existsSync(templatePath)) {
//     console.error(
//       'Template folder does not exist. Please ensure the src/redux-template folder exists.'
//     );
//     return;
//   }

//   // Check if the destination folder (redux) exists
//   if (!fs.existsSync(reduxPath)) {
//     console.log('Creating Redux folder...');
//     copyFolderSync(templatePath, reduxPath);
//     console.log('Redux folder created.');
//   } else {
//     console.log('Redux folder already exists. Skipping.');
//   }
// }

// createReduxFolder();

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const mainProjectRoot = process.env.INIT_CWD || process.cwd(); // Main project's root directory
const srcPath = path.join(mainProjectRoot, 'src'); // Path to the src folder
const reduxPath = fs.existsSync(srcPath)
  ? path.join(srcPath, 'redux')
  : path.join(mainProjectRoot, 'redux'); // Use src/redux if src exists, otherwise use root/redux
const templatePath = path.join(
  mainProjectRoot,
  './node_modules/rtk-ready/src/redux'
); // Template folder inside your custom package

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
    console.log(`Creating Redux folder at ${reduxPath}...`);
    copyFolderSync(templatePath, reduxPath);
    console.log('Redux folder created.');
  } else {
    console.log('Redux folder already exists. Skipping.');
  }
}

function installDependencies() {
  const dependencies = [
    '@reduxjs/toolkit@latest',
    'js-cookie@latest',
    'react-redux@latest',
    'redux-persist@latest',
  ];

  const devDependencies = [
    '@types/js-cookie@latest',
    '@types/react-redux@latest',
  ];

  console.log('Installing dependencies in the main project...');
  try {
    execSync(`npm install ${dependencies.join(' ')}`, {
      cwd: mainProjectRoot, // Run in the main project's directory
      stdio: 'inherit',
    });

    // Check if the project uses TypeScript
    const tsconfigPath = path.join(mainProjectRoot, 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
      console.log('TypeScript detected. Installing dev dependencies...');
      execSync(`npm install --save-dev ${devDependencies.join(' ')}`, {
        cwd: mainProjectRoot, // Run in the main project's directory
        stdio: 'inherit',
      });
    }

    console.log('Dependencies installed successfully.');
  } catch (error) {
    console.error('Error installing dependencies:', error.message);
    process.exit(1);
  }
}

// async function runRTKReady() {
//   console.log('Running npx rtk-ready in the main project...');
//   try {
//     execSync(
//       `npx rtk-read`,
//       {
//         cwd: mainProjectRoot, // Run in the main project's directory
//         stdio: 'inherit',
//       }
//     );
//     console.log('npx rtk-ready executed successfully.');
//   } catch (error) {
//     console.error('Error running npx rtk-ready:', error.message);
//     process.exit(1);
//   }
// }

await createReduxFolder();
await installDependencies();
// await runRTKReady();
