#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_child_process = require("child_process");
var mainProjectRoot = process.env.INIT_CWD || process.cwd();
var srcPath = import_path.default.join(mainProjectRoot, "src");
var reduxPath = import_fs.default.existsSync(srcPath) ? import_path.default.join(srcPath, "redux") : import_path.default.join(mainProjectRoot, "redux");
var templatePath = import_path.default.join(
  mainProjectRoot,
  "./node_modules/rtk-ready/src/redux"
);
function copyFolderSync(from, to) {
  if (!import_fs.default.existsSync(from)) {
    console.error(`Source folder does not exist: ${from}`);
    return;
  }
  import_fs.default.mkdirSync(to, { recursive: true });
  import_fs.default.readdirSync(from).forEach((element) => {
    const stat = import_fs.default.lstatSync(import_path.default.join(from, element));
    if (stat.isFile()) {
      import_fs.default.copyFileSync(import_path.default.join(from, element), import_path.default.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(import_path.default.join(from, element), import_path.default.join(to, element));
    }
  });
}
function createReduxFolder() {
  if (!import_fs.default.existsSync(templatePath)) {
    console.error(
      "Template folder does not exist. Please ensure the src/redux-template folder exists."
    );
    return;
  }
  if (!import_fs.default.existsSync(reduxPath)) {
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
    (0, import_child_process.execSync)(`npm install ${dependencies.join(" ")}`, {
      cwd: mainProjectRoot,
      // Run in the main project's directory
      stdio: "inherit"
    });
    const tsconfigPath = import_path.default.join(mainProjectRoot, "tsconfig.json");
    if (import_fs.default.existsSync(tsconfigPath)) {
      console.log("TypeScript detected. Installing dev dependencies...");
      (0, import_child_process.execSync)(`npm install --save-dev ${devDependencies.join(" ")}`, {
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
//# sourceMappingURL=index.cjs.map