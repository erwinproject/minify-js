# Minify JavaScript Files

## Description

This project uses Node.js and the `terser` library to minify JavaScript files. It will scan the `input` folder and all its sub-folders, minify all JavaScript files found, and save the results in the `output` folder with the same structure.

## Features

- Scans the `input` folder and all its sub-folders.
- Minifies all JavaScript files found.
- Shows information about the compression percentage and the number of kilobytes saved for each file.
- Saves the minification results in the `output` folder with the same structure as the `input` folder.

## Requirements

- Node.js (version 14 or later)
- npm (Node Package Manager)

## Installation

1. **Clone Repository:**
```bash
git clone https://github.com/erwinproject/minify-js.git
cd minify-js
```
2. **Install Dependencies:**
```bash
npm install
```
3. **Run Script:**
```bash
node minify.js
```
