const { execSync } = require('child_process');
const fs = require('fs');
const { promisify } = require('util')
const path = require('path');

fs.mkdir = promisify(fs.mkdir)
fs.writeFile = promisify(fs.writeFile)

const dependencies = ["express", "objection", "knex"];
const devDependencies = ["sqlite3",  "nodemon", "@types/express", "@types/node", "typescript", "jest", "@types/jest", "ts-jest" ]

module.exports = function initializeProject(projectName) {
    let projectDir = path.join(process.cwd(), projectName);
    console.log("initializing new project.");
    fs.mkdirSync(projectName);
    console.log("installing dependencies...");
    execSync(`cd ${projectName} && npm init -y \
    && npm i ${dependencies.join(" ")} \
    && npm i -D ${devDependencies.join(" ")} \
    `)
    console.log("installed dependencies.");
    console.log("generating project files...");

    fs.mkdirSync(path.join(projectDir, "/migrations"), {recursive: true})
    
    fs.mkdirSync(path.join(projectDir, "/src/controllers"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/controllers/index.ts"), "", { flag: "w" });

    fs.mkdirSync(path.join(projectDir, "/src/tests"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/tests/index.test.ts"), "", { flag: "w" });
    
    
    fs.mkdirSync(path.join(projectDir, "/src/services"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/services/index.ts"), "", { flag: "w" });
    

    let { interface, model } = require('./templates/basemodel');
    let db = require('./templates/db');
    let exceptions = require('./templates/exceptions');
    let {index, error, router} = require('./templates/express');
    let dep = require('./templates/dependency');
    
    fs.mkdirSync(path.join(projectDir, "/src/dependency"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/dependency/index.ts"), dep(), { flag: "w" });
    

    fs.mkdirSync(path.join(projectDir, "/src/models/interface"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/models/interface/base.ts"),  interface()), { flag: "w" };
 
 
    fs.mkdirSync(path.join(projectDir, "/src/models/objection"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/models/objection/base.ts"),  model()), { flag: "w" };
 
 
    fs.mkdirSync(path.join(projectDir, "/src/db/objection"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/db/objection/index.ts"),  db()), { flag: "w" };
 
 
    fs.mkdirSync(path.join(projectDir, "/src/exceptions"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/exceptions/index.ts"),  exceptions()), { flag: "w" };

    fs.mkdirSync(path.join(projectDir, "/src/application/express"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/application/express/index.ts"),  index()), { flag: "w" };
    fs.writeFileSync(path.join(projectDir, "/src/application/express/error.ts"),  error()), { flag: "w" };

    fs.mkdirSync(path.join(projectDir, "/src/application/express/api"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/application/express/api/index.ts"),  router()), { flag: "w" };

    fs.mkdirSync(path.join(projectDir, "/src/application/express/api/v1"), {recursive: true});
    fs.writeFileSync(path.join(projectDir, "/src/application/express/api/v1/index.ts"),  router()), { flag: "w" };

    const { jest, knex, tsconfig } = require('./templates/configs');
    fs.writeFileSync(path.join(projectDir, "jest.config.js"),  jest()), { flag: "w" };
    fs.writeFileSync(path.join(projectDir, "tsconfig.js"),  tsconfig()), { flag: "w" };
    fs.writeFileSync(path.join(projectDir, "knexfile.js"),  knex()), { flag: "w" };

}