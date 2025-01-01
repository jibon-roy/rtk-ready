#!/usr/bin/env node

// import fs from "fs";
// import path from "path";
// import { execSync } from "child_process";

// const mainProjectRoot = process.env.INIT_CWD || process.cwd();
// const srcPath = path.join(mainProjectRoot, "src");
// const srcPathWithRedux = path.join(srcPath, 'redux');
// const reduxWithPath = path.join(mainProjectRoot, "redux");
// const reduxPath = fs.existsSync(srcPath)
//   ? path.join(srcPath, "redux")
//   : path.join(mainProjectRoot, "redux");
// const templatePath = path.join(
//   mainProjectRoot,
//   "./node_modules/rtk-ready/src/redux"
// );
// const markerFilePath = path.join(reduxPath, ".rtk-ready-installed");

// // Utility to copy folder content recursively
// function copyFolderSync(from: string, to: string) {
//   if (!fs.existsSync(from)) {
//     console.log(`Source folder does not exist: ${from}`);
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

// // Create the Redux folder structure
// function createReduxFolder() {
//   if (!fs.existsSync(templatePath)) {
//     console.error(
//       "Template folder does not exist. Please ensure the src/redux-template folder exists."
//     );
//     return;
//   }
//   if (!fs.existsSync(reduxPath)) {
//     console.log(`Creating Redux folder at ${reduxPath}...`);
//     copyFolderSync(templatePath, reduxPath);
//     fs.writeFileSync(markerFilePath, "true");
//     console.log("Redux folder created.");
//   } else if (!fs.existsSync(markerFilePath)) {
//     console.log("Redux folder already exists but marker file is missing. Skipping.");
//   } else {
//     console.log("Redux folder and marker file already exist. Skipping.");
//   }
// }

// // Install required dependencies
// function installDependencies() {
//   const dependencies = [
//     "@reduxjs/toolkit@latest",
//     "js-cookie@latest",
//     "react-redux@latest",
//     "redux-persist@latest",
//   ];
//   const devDependencies = [
//     "@types/js-cookie@latest",
//     "@types/react-redux@latest",
//   ];

//   console.log("Installing dependencies in the main project...");
//   try {
//     execSync(`npm install ${dependencies.join(" ")}`, {
//       cwd: mainProjectRoot,
//       stdio: "inherit",
//     });

//     // Check for TypeScript support
//     const tsconfigPath = path.join(mainProjectRoot, "tsconfig.json");
//     if (fs.existsSync(tsconfigPath)) {
//       console.log("TypeScript detected. Installing dev dependencies...");
//       execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
//         cwd: mainProjectRoot,
//         stdio: "inherit",
//       });
//     }
//     console.log("Dependencies installed successfully.");
//   } catch (error: any) {
//     console.error("Error installing dependencies:", error.message);
//     // Exit process with a success code to prevent npm from failing.
//     process.exit(0);
//   }
// }

// // Main execution
// createReduxFolder();
// installDependencies();

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const mainProjectRoot = process.env.INIT_CWD || process.cwd();
const srcPath = path.join(mainProjectRoot, 'src');
const reduxPath = fs.existsSync(srcPath)
  ? path.join(srcPath, 'redux')
  : path.join(mainProjectRoot, 'redux');
const templatePath = path.join(
  mainProjectRoot,
  './node_modules/rtk-ready/src/redux'
);
const markerFilePath = path.join(reduxPath, '.rtk-ready-installed');

// Utility to copy folder content recursively
function copyFolderSync(from: string, to: string) {
  if (!fs.existsSync(from)) {
    console.log(`Source folder does not exist: ${from}`);
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

// Utility to find a unique folder name
function getUniqueFolderName(basePath: string, folderName: string): string {
  let uniqueName = folderName;
  let counter = 0;

  while (fs.existsSync(path.join(basePath, uniqueName))) {
    counter++;
    uniqueName = `${folderName}(${counter})`;
  }

  return path.join(basePath, uniqueName);
}

// Create the Redux folder structure
function createReduxFolder() {
  if (!fs.existsSync(templatePath)) {
    console.error(
      'Template folder does not exist. Please ensure the src/redux-template folder exists.'
    );
    return;
  }

  let targetPath = reduxPath;
  if (fs.existsSync(reduxPath)) {
    // Find a unique folder name if redux already exists
    console.log(
      'Redux folder already exists. Searching for a unique folder name...'
    );
    targetPath = getUniqueFolderName(
      fs.existsSync(srcPath) ? srcPath : mainProjectRoot,
      'redux'
    );
  }

  console.log(`Creating Redux folder at ${targetPath}...`);
  copyFolderSync(templatePath, targetPath);
  fs.writeFileSync(path.join(targetPath, '.rtk-ready-installed'), 'true');
  console.log('Redux folder created.');
}

// Install required dependencies
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
      cwd: mainProjectRoot,
      stdio: 'inherit',
    });

    // Check for TypeScript support
    const tsconfigPath = path.join(mainProjectRoot, 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
      console.log('TypeScript detected. Installing dev dependencies...');
      execSync(`npm install --save-dev ${devDependencies.join(' ')}`, {
        cwd: mainProjectRoot,
        stdio: 'inherit',
      });
    }
    console.log('Dependencies installed successfully.');
  } catch (error: any) {
    console.error('Error installing dependencies:', error.message);
    // Exit process with a success code to prevent npm from failing.
    process.exit(0);
  }
}

// Main execution
createReduxFolder();
installDependencies();
