const { execSync } = require('child_process');
const fs = require('fs');
const { promisify } = require('util')
const path = require('path');

fs.mkdir = promisify(fs.mkdir)

const dependencies = [ "qufl", /*"express", "objection", "knex", "jsonwebtoken", "cookie-parser" */];
const devDependencies = ["sqlite3", /* "nodemon", "@types/express", "@types/jsonwebtoken", "@types/node", "@types/cookie-parser", "typescript", "jest", "@types/jest", "ts-jest" */]

module.exports = async function initializeProject(projectName) {
    let projectDir = path.join(process.cwd(), projectName);
    console.log("initializing new project.");
    await fs.mkdir(projectName);
    console.log("installing dependencies...");
    execSync(`cd ${projectName} && npm init -y`)
    // && npm i ${dependencies.join(" ")} \
    // && npm i -D ${devDependencies.join(" ")} \
    // `)
    console.log("installed dependencies.");
    console.log("generating project files...")
    fs.writeFile(path.join(projectName, "/src/controllers/index.ts"), "");
    fs.writeFile(path.join(projectName, "/src/dependency/index.ts"), "");
    fs.writeFile(path.join(projectName, "/src/tests/index.test.ts"), "");
    fs.writeFile(path.join(projectName, "/src/services/index.ts"), "");

    let { interface, model } = require('./templates/basemodel');
    let db = require('./templates/db');
    let exceptions = require('./templates/exceptions');
    let {index} = require('./templates/express');

    fs.writeFile(path.join(projectName, "/src/models/interface/base.ts"),  interface());
    fs.writeFile(path.join(projectName, "/src/models/objection/base.ts"),  model());
    fs.writeFile(path.join(projectName, "/src/db/objection/index.ts"),  db());
    fs.writeFile(path.join(projectName, "/src/exceptions/index.ts"),  exceptions());
}