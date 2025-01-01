#!/usr/bin/env node

// src/index.ts
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
var mainProjectRoot = process.env.INIT_CWD || process.cwd();
var srcPath = path.join(mainProjectRoot, "src");
var reduxPath = fs.existsSync(srcPath) ? path.join(srcPath, "redux") : path.join(mainProjectRoot, "redux");
var templatePath = path.join(
  mainProjectRoot,
  "./node_modules/rtk-ready/src/redux"
);
var markerFilePath = path.join(reduxPath, ".rtk-ready-installed");
function copyFolderSync(from, to) {
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
function getUniqueFolderName(basePath, folderName) {
  let uniqueName = folderName;
  let counter = 0;
  while (fs.existsSync(path.join(basePath, uniqueName))) {
    counter++;
    uniqueName = `${folderName}(${counter})`;
  }
  return path.join(basePath, uniqueName);
}
function createReduxFolder() {
  if (!fs.existsSync(templatePath)) {
    console.error(
      "Template folder does not exist. Please ensure the src/redux-template folder exists."
    );
    return;
  }
  let targetPath = reduxPath;
  if (fs.existsSync(reduxPath)) {
    console.log(
      "Redux folder already exists. Searching for a unique folder name..."
    );
    targetPath = getUniqueFolderName(
      fs.existsSync(srcPath) ? srcPath : mainProjectRoot,
      "redux"
    );
  }
  console.log(`Creating Redux folder at ${targetPath}...`);
  copyFolderSync(templatePath, targetPath);
  fs.writeFileSync(path.join(targetPath, ".rtk-ready-installed"), "true");
  console.log("Redux folder created.");
}
function installDependencies() {
  const dependencies = [
    "@reduxjs/toolkit@latest",
    "js-cookie@latest",
    "react-redux@latest",
    "redux-persist@latest"
  ];
  const devDependencies = [
    "@types/js-cookie@latest",
    "@types/react-redux@latest"
  ];
  console.log("Installing dependencies in the main project...");
  try {
    execSync(`npm install ${dependencies.join(" ")}`, {
      cwd: mainProjectRoot,
      stdio: "inherit"
    });
    const tsconfigPath = path.join(mainProjectRoot, "tsconfig.json");
    if (fs.existsSync(tsconfigPath)) {
      console.log("TypeScript detected. Installing dev dependencies...");
      execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
        cwd: mainProjectRoot,
        stdio: "inherit"
      });
    }
    console.log("Dependencies installed successfully.");
  } catch (error) {
    console.error("Error installing dependencies:", error.message);
    process.exit(0);
  }
}
createReduxFolder();
installDependencies();
//# sourceMappingURL=index.js.map