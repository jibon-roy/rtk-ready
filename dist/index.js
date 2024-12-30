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
  if (!fs.existsSync(templatePath)) {
    console.error(
      "Template folder does not exist. Please ensure the src/redux-template folder exists."
    );
    return;
  }
  if (!fs.existsSync(reduxPath)) {
    console.log(`Creating Redux folder at ${reduxPath}...`);
    copyFolderSync(templatePath, reduxPath);
    console.log("Redux folder created.");
  } else {
    console.log("Redux folder already exists. Skipping.");
  }
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
      // Run in the main project's directory
      stdio: "inherit"
    });
    const tsconfigPath = path.join(mainProjectRoot, "tsconfig.json");
    if (fs.existsSync(tsconfigPath)) {
      console.log("TypeScript detected. Installing dev dependencies...");
      execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
        cwd: mainProjectRoot,
        // Run in the main project's directory
        stdio: "inherit"
      });
    }
    console.log("Dependencies installed successfully.");
  } catch (error) {
    console.error("Error installing dependencies:", error.message);
    process.exit(1);
  }
}
createReduxFolder();
installDependencies();
//# sourceMappingURL=index.js.map